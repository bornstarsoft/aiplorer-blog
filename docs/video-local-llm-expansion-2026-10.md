# Video And Local LLM Directory Expansion

Review date: 2026-10-03 (Asia/Seoul)
Phase: implementation, validation, and user-authorized GitHub/Cloudflare release.

## Scope And Decisions

The user requested Seedance, Kling, useful missing tools, and a new local LLM
category, including commit and deployment. All ten entries below passed a
conservative official-source identity and task-fit review. They are published
with `reviewStatus: reviewed`, `draft: false`, and review/lastmod dates matching
this review. No claim of hands-on testing is made.

| Tool | Category | Reviewed role | Official evidence |
| --- | --- | --- | --- |
| Seedance | Video Tools | ByteDance video-model family; distinguish model from access provider | [Seed model page](https://seed.bytedance.com/en/seedance2_5), [BytePlus access/billing context](https://www.byteplus.com/en/product/seedance), [disclaimer](https://seed.bytedance.com/en/disclaimer) |
| Kling AI | Video Tools | Text/image-led video drafts | [Product](https://kling.ai/), [quick start](https://kling.ai/quickstart), [terms](https://kling.ai/docs/user-policy), [privacy](https://kling.ai/docs/privacy-policy) |
| HeyGen | Video Tools | Presenter-led video and translation | [Product](https://www.heygen.com/), [pricing](https://www.heygen.com/pricing), [privacy](https://www.heygen.com/privacy), [terms](https://www.heygen.com/terms) |
| Google Veo | Video Tools | Video-model family with product-specific access | [Model overview](https://deepmind.google/models/veo/), [Flow help](https://support.google.com/flow/answer/16353333?hl=en), [data FAQ](https://labs.google/fx/faq) |
| Ollama | Local LLM Tools | Local model runner, distinct from optional cloud use | [Product](https://ollama.com/), [FAQ](https://docs.ollama.com/faq), [pricing](https://ollama.com/pricing), [privacy](https://ollama.com/privacy) |
| LM Studio | Local LLM Tools | Desktop model management/chat; broader connected products are separate | [App docs](https://lmstudio.ai/docs/app), [offline guide](https://lmstudio.ai/docs/app/offline), [privacy](https://lmstudio.ai/app-privacy), [pricing](https://lmstudio.ai/pricing), [terms](https://lmstudio.ai/app-terms) |
| Jan | Local LLM Tools | Desktop local/connected model workflows | [Product](https://www.jan.ai/), [desktop docs](https://www.jan.ai/docs/desktop), [repository](https://github.com/janhq/jan), [privacy](https://www.jan.ai/privacy) |
| GPT4All | Local LLM Tools | Desktop local chat and LocalDocs | [Product](https://www.nomic.ai/gpt4all), [docs](https://docs.gpt4all.io/), [settings](https://docs.gpt4all.io/gpt4all_desktop/settings.html), [models](https://docs.gpt4all.io/gpt4all_desktop/models.html), [repository](https://github.com/nomic-ai/gpt4all) |
| llama.cpp | Local LLM Tools | Technical inference runtime, not a bundled model | [Maintainer repository](https://github.com/ggml-org/llama.cpp), [license](https://github.com/ggml-org/llama.cpp/blob/master/LICENSE) |
| Open WebUI | Local LLM Tools | Self-hosted interface needing a model backend | [Docs](https://docs.openwebui.com/), [quick start](https://docs.openwebui.com/getting-started/quick-start/), [license](https://docs.openwebui.com/license/) |

## Review Boundaries

- Old Kling root was robots-blocked; the official global app redirects to
  `kling.ai/app/`, and `kling.ai` product/help/policy pages were readable. The
  developer pricing route returned no useful table. No specific pricing or
  creative-studio entitlement is published.
- Seedance's provider-specific terms are not interchangeable. Its model and
  provider product pages support a limited overview, not universal region,
  feature, commercial-use, or privacy claims. A guessed BytePlus privacy URL
  returned a not-found page and is not cited as verified policy evidence.
- Jan's former docs subdomain was unavailable. Current desktop documentation
  was read on `www.jan.ai`; the maintainer repository redirects to `janhq/jan`.
- LM Studio and Ollama now discuss cloud as well as local features. The pages
  explicitly avoid a blanket "nothing leaves your device" claim.
- Open WebUI's branding/license conditions are acknowledged. It is not labeled
  as unrestricted white-label software, and its UI is not described as a model.
- Model files have separate licenses, hardware needs, and compatibility. No
  model download, runtime installation, account purchase, or new backend was
  performed in this repository.
- Video entries require checks for likeness/voice consent, media rights,
  continuity, factual claims, privacy, exports, credits, and changing access.
- Local entries require checks for memory/storage, selected endpoints,
  cloud/extension behavior, server exposure, secrets, output correctness,
  workplace policy, model provenance, and license obligations.

## Discovery And Category Strategy

The central category partial drives the homepage directory, reviewed index,
category hub, category links, comparison groups, and filters. Adding Local LLM
Tools there avoids a separately maintained tool list. The category page offers
three starting points: desktop apps, runners, and a browser interface. Video
category copy distinguishes scene generation from presenters and editing.

Optional `searchAliases` adds alternate spellings to the existing search index.
Seedance can be found using the Korean spellings requested by the user; Kling
also has a Korean alias. No new search service, ranking, tracking, or database
is introduced. Existing cards, icon partials, and styles are reused.

Before this batch there were 65 reviewed public tool pages. This batch adds 10,
for 75 total across 11 categories. The eight existing tool drafts, including
SciSpace, Tome, and the example, must remain unchanged and excluded from the
production directory and sitemap.

## Validation And Release Boundary

Run production, draft, and restored-production Hugo builds, then:

```sh
node scripts/validate-video-local-llm.mjs
node scripts/test-tool-finder.mjs
node scripts/validate-shortlist.mjs
node scripts/validate-production-post-urls.mjs
git diff --check
git diff --cached --check
```

Inspect desktop and mobile discovery, the new category, a local tool detail,
and Korean search aliases. Stage only this batch's exact content, templates,
documentation, and validator. Build an exported index snapshot before commit
so unrelated dirty content/CSS/config work is not accidentally required or
deployed. Generated files must not enter Git. After push, check the Cloudflare
commit check, all new public routes, category/index discovery, sitemap, and
protected draft 404s without query parameters.

Pre-release results on 2026-10-03: production, draft, and restored production
builds passed with Hugo 0.152.2. The exported-index production build also passed
the new batch validator, shortlist validation (75 candidates), and legacy URL
validation (291 unique published post routes). All six tool-finder tests passed.
Desktop 1440px and mobile 390px category views had no horizontal overflow;
mobile detail and category-filter checks passed. The Korean Seedance and Kling
queries each returned the intended single tool. Browser console reported no
errors. The pre-existing raw-HTML warning for a legacy post was not changed.
