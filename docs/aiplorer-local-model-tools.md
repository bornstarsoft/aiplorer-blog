# Review a model catalog and a local language model runner

WORK-ID: AIP-LOCAL-MODEL-TOOLS
ACTIVE_WRITER = NONE

Base: 0f5f6fa. Owner approved scoped tool discovery and production deployment.
Use the existing Local LLM Tools category. Preserve the home layout,
legacy URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- Hugging Face Hub: [model catalog](https://huggingface.co/models),
  [model cards](https://huggingface.co/docs/hub/model-cards),
  [licenses](https://huggingface.co/docs/hub/repositories-licenses),
  [revisions and downloads](https://huggingface.co/docs/huggingface_hub/package_reference/file_download),
  [hosted inference](https://huggingface.co/docs/inference-providers/index),
  [pricing](https://huggingface.co/pricing), and [privacy](https://huggingface.co/privacy).
- MLX LM: [project](https://github.com/ml-explore/mlx-lm),
  [license](https://github.com/ml-explore/mlx-lm/blob/main/LICENSE),
  [releases](https://github.com/ml-explore/mlx-lm/releases), and
  [Hugging Face MLX documentation](https://huggingface.co/docs/hub/mlx).

The Hub profile checks a named model revision without treating the Hub as
a local runtime. The MLX LM profile focuses on a small Apple silicon test
without claiming that the package supports only Apple silicon. It separates
the package license from model terms and model download from local execution.
No model was downloaded or run. No compatibility, privacy, or speed
guarantees are made.

Last AI: Codex. Implementation and local QA: DONE on main, based on 0f5f6fa.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both tools appear in Local LLM
Tools, the reviewed directory, shortlist, comparison, and sitemap.
Browser checks covered Korean search, mobile layout, official links,
practice links, and saving. Home changes are limited to two cards and
tool counts. Reset history is unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
