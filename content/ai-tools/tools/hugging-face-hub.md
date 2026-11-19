---
title: "Hugging Face Hub"
description: "Find downloadable language models and compare who published them, how they are licensed, and which revision fits your runner."
type: "ai-tools"
layout: "tool"
category: "Local LLM Tools"
searchAliases: ["huggingface", "hf hub", "model repository", "model cards", "허깅페이스 허브", "허깅 페이스 허브", "허깅페이스"]
bestFor:
  - Finding a candidate model before choosing what to download
  - Checking a model card for its intended use and limitations
  - Recording the exact revision for a repeatable comparison
beginnerFriendly: null
freePlan: null
pricingNote: "Check access and terms for the specific repository. Downloads and hosted inference are distinct workflows; check current pricing before using a hosted provider."
officialUrl: "https://huggingface.co/models"
lastReviewed: "2026-11-19"
lastmod: "2026-11-19"
draft: false
useCases:
  - Compare a publisher's repository and a community conversion with a similar name
  - Match the file format to your local runner before downloading
  - Check whether a later result used the same revision
pros:
  - Hugging Face documents model cards and repository license metadata
  - A repository ID and revision let you distinguish similarly named files or builds
limitations:
  - A model card is not independent validation of the publisher's claims
  - Download access does not imply commercial rights or compatibility with your computer
  - Check the publisher and files, and do not run unreviewed code from a model repository
similarTools:
  - MLX LM
  - LM Studio
reviewStatus: "reviewed"
sourceNotes:
  - "Checked https://huggingface.co/models, https://huggingface.co/docs/hub/model-cards, and https://huggingface.co/docs/hub/repositories-licenses on 2026-11-19 for model discovery, documentation, and licenses."
  - "Checked Hugging Face's file-download and hosted-inference docs, https://huggingface.co/pricing, and https://huggingface.co/privacy on 2026-11-19 without assuming access or privacy guarantees."
---

## Check the Repository, Not Just the Model Name

Read the [model card](https://huggingface.co/docs/hub/model-cards), check the
publisher, and open the actual [license](https://huggingface.co/docs/hub/repositories-licenses)
before downloading. Compare a publisher's model and a community conversion
that share a name. Make sure the file format matches your runner and that
the card describes how the conversion differs. If you cannot verify the
source or terms, choose another candidate.

## Keep the Revision for the Next Comparison

Record the repository ID, file, and
[revision](https://huggingface.co/docs/huggingface_hub/package_reference/file_download).
Use the [tool comparison practice pack](/use-cases/check-an-ai-tool-comparison-against-test-records/)
to keep a result from one version from being misattributed to another.
The Hub catalog does not run a model on your device. Before using
[hosted inference](https://huggingface.co/docs/inference-providers/index),
check who handles your input, applicable [privacy terms](https://huggingface.co/privacy),
and [pricing](https://huggingface.co/pricing).
