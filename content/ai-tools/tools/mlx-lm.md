---
title: "MLX LM"
description: "Run a compatible language model on Apple silicon with MLX, and keep the model and settings recorded for the next test."
type: "ai-tools"
layout: "tool"
category: "Local LLM Tools"
searchAliases: ["mlx-lm", "apple silicon llm", "mlx local model runner", "애플 실리콘 로컬 LLM", "엠엘엑스 엘엠"]
bestFor:
  - Trying a compatible model on an Apple silicon Mac
  - Running the same text task against two model revisions
  - Recording the settings that explain a changed output
beginnerFriendly: null
freePlan: null
pricingNote: "The project publishes its package license. Check model terms separately and account for your hardware, storage, and any hosted services you choose."
officialUrl: "https://github.com/ml-explore/mlx-lm"
lastReviewed: "2026-11-19"
lastmod: "2026-11-19"
draft: false
useCases:
  - Test a small compatible model with a fictional set of meeting notes
  - Check that a summary does not turn an open question into a decision
  - Repeat the task after changing one model or runtime setting
pros:
  - The project documents text generation and interactive chat
  - Keeping the prompt and settings makes a later comparison easier to interpret
limitations:
  - Model format, available memory, and context length can affect whether a run fits
  - A successful run does not prove a result is correct
  - Model downloads can use the network even when text generation runs on the Mac
similarTools:
  - Hugging Face Hub
  - llama.cpp
reviewStatus: "reviewed"
sourceNotes:
  - "Checked https://github.com/ml-explore/mlx-lm, https://github.com/ml-explore/mlx-lm/releases, and https://huggingface.co/docs/hub/mlx on 2026-11-19 for local generation and compatible model sources."
  - "Checked https://github.com/ml-explore/mlx-lm/blob/main/LICENSE and Hugging Face's model license and privacy guidance on 2026-11-19 without assuming that the package license applies to model weights."
---

## Start With a Small, Known Task

The [MLX LM project](https://github.com/ml-explore/mlx-lm) documents text
generation and chat. This example focuses on Apple silicon. Use a small
compatible model from an approved publisher. Give it fictional meeting
notes with one confirmed decision and one open question. Check that the
summary keeps them separate instead of judging only how fluent it is.

## Change One Thing for the Next Run

Keep the model revision, package version, prompt, and generation settings.
Check the [release notes](https://github.com/ml-explore/mlx-lm/releases)
before updating. Then follow the
[saved-tool retest guide](/use-cases/retest-a-saved-ai-tool-after-an-update/)
and compare the same task after changing one thing.

Read the [package license](https://github.com/ml-explore/mlx-lm/blob/main/LICENSE)
and the model's separate terms. Use non-sensitive inputs for trials.
If you use the Hub to download model files, check its
[privacy policy](https://huggingface.co/privacy). Downloading a model
and sending your prompts to a hosted service are different actions.
