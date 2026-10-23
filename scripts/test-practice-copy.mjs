import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../static/js/aiplorer-practice-copy.js", import.meta.url), "utf8");
function pack(text = "  Fictional input\n<code>&\n") {
  const nodes = {
    "pre code": { textContent: text },
    "[data-practice-copy-controls]": { hidden: true },
    "[data-practice-copy-status]": { textContent: "" },
    "[data-practice-copy]": {
      disabled: false,
      addEventListener(name, handler) { assert.equal(name, "click"); this.click = handler; },
    },
  };
  return {
    nodes,
    querySelector: key => nodes[key],
    get button() { return nodes["[data-practice-copy]"]; },
    get status() { return nodes["[data-practice-copy-status]"].textContent; },
    get hidden() { return nodes["[data-practice-copy-controls]"].hidden; },
  };
}
function setup(packs, writeText, secure = true) {
  vm.runInNewContext(source, {
    window: { isSecureContext: secure },
    navigator: { clipboard: writeText ? { writeText } : undefined },
    document: { querySelectorAll: selector => { assert.equal(selector, "[data-practice-preview]"); return packs; } },
  });
}

test("copies only exact input on click, never during initialization", async () => {
  const p = pack();
  const calls = [];
  setup([p], text => { calls.push(text); return Promise.resolve(); });
  assert.equal(p.hidden, false);
  assert.deepEqual(calls, []);
  await p.button.click();
  assert.deepEqual(calls, ["  Fictional input\n<code>&\n"]);
  assert.equal(p.status, "Test input copied.");
  assert.equal(p.button.disabled, false);
});

test("pending copies are guarded and separate packs do not share status", async () => {
  const first = pack("first"), second = pack("second");
  const pending = new Map();
  setup([first, second], text => new Promise(resolve => pending.set(text, resolve)));
  const one = first.button.click();
  await first.button.click();
  assert.equal(first.status, "Copying...");
  assert.equal(first.button.disabled, true);
  assert.equal(second.status, "");
  const two = second.button.click();
  assert.equal(pending.size, 2);
  pending.get("second")();
  await two;
  assert.equal(second.status, "Test input copied.");
  assert.equal(first.status, "Copying...");
  pending.get("first")();
  await one;
  assert.equal(first.button.disabled, false);
});

for (const mode of ["rejection", "synchronous throw"]) {
  test(`${mode} reports failure and permits retry`, async () => {
    const p = pack();
    let attempts = 0;
    setup([p], () => {
      if (++attempts > 1) return Promise.resolve();
      if (mode === "rejection") return Promise.reject(new Error("Denied"));
      throw new Error("Denied");
    });
    await p.button.click();
    assert.equal(p.status, "Could not copy. Select the preview text or download the input file.");
    assert.equal(p.button.disabled, false);
    await p.button.click();
    assert.equal(p.status, "Test input copied.");
  });
}

test("unsupported or insecure contexts retain native fallback without controls", () => {
  for (const [writer, secure] of [[undefined, true], [() => assert.fail("No write"), false]]) {
    const p = pack();
    setup([p], writer, secure);
    assert.equal(p.hidden, true);
    assert.equal(p.button.click, undefined);
  }
});

test("empty or malformed previews are skipped without breaking valid siblings", () => {
  for (const missing of ["pre code", "[data-practice-copy-controls]", "[data-practice-copy]", "[data-practice-copy-status]"]) {
    const malformed = pack(), valid = pack();
    delete malformed.nodes[missing];
    setup([malformed, valid], () => assert.fail("No automatic copy"));
    assert.equal(valid.hidden, false);
  }
  const empty = pack("");
  setup([empty], () => assert.fail("No empty copy"));
  assert.equal(empty.hidden, true);
});
