---
title: "llama.cpp"
description: "A hands-on inference runtime for running supported language models on local hardware or a server you manage."
type: "ai-tools"
layout: "tool"
category: "Local LLM Tools"
searchAliases: ["llama cpp", "local inference", "로컬 LLM"]
bestFor:
  - Learning how local model inference is configured
  - Testing model files against available hardware
  - Building a controlled model-serving experiment
beginnerFriendly: null
freePlan: null
pricingNote: "This is a software project rather than a bundled hosted-model subscription. Budget for hardware or hosting, and check the runtime license and each model's separate terms."
officialUrl: "https://github.com/ggml-org/llama.cpp"
lastReviewed: "2026-10-03"
lastmod: "2026-10-03T00:00:00+09:00"
draft: false
reviewStatus: "reviewed"
useCases:
  - Evaluate a model on a fixed local prompt
  - Explore inference configuration in a disposable development setup
  - Compare runtime settings without changing the underlying task
pros:
  - Gives technical users control over a model's execution setup
  - Maintainer documentation covers build and server workflows
limitations:
  - More setup responsibility than a ready-to-use desktop chat app
  - Hardware backends, file formats, and model support evolve
  - Keep server endpoints private and review dependencies and downloaded models
  - Check output correctness and model-specific license obligations
similarTools: ["Ollama", "LM Studio", "Jan"]
sourceNotes:
  - "Reviewed https://github.com/ggml-org/llama.cpp on 2026-10-03 for runtime identity, command-line/server use, hardware scope, and maintainer documentation links."
  - "Reviewed https://github.com/ggml-org/llama.cpp/blob/master/LICENSE on 2026-10-03. The runtime license is not presented as a license to all model weights or generated outputs."
---

## Where it fits

llama.cpp is a C/C++ inference project for running supported models. It is a runtime rather than a particular language model or an account with a hosted assistant. The [maintainer repository](https://github.com/ggml-org/llama.cpp) documents command-line and server workflows and supported hardware backends.

## Choose the right level of setup

Consider it when you want to understand or control model execution and can maintain a technical environment. If your goal is simply to open an app and chat, compare [LM Studio](/ai-tools/tools/lm-studio/) or [Jan](/ai-tools/tools/jan/) first. [Ollama](/ai-tools/tools/ollama/) is another model-runner workflow to evaluate.

For a first experiment, use a disposable setup and a non-sensitive prompt. Change one runtime setting at a time and record both answer usefulness and resource use. A successful launch does not establish that a model is accurate or suitable for production.

## Before serving a model

Review network exposure, access controls, model provenance, dependencies, and license obligations. The [project license](https://github.com/ggml-org/llama.cpp/blob/master/LICENSE) and the chosen model's terms are separate. Source review date: October 3, 2026. No performance or security guarantees are made.
