# Aiplorer Editorial Images

## Scope

- Phase: local implementation and validation. No commit, push or deployment.
- Eight new AI-generated editorial illustrations cover 8 existing public guides and 7 public use cases. No tool claims, review dates or publication states were changed for imagery.
- The home page now places three compact task-guide links between its reset/update strip and directory results. Search stays above these entries.
- Guide and use-case cards use the illustrations. Article sidebars repeat the relevant illustration beside the reading/navigation area; on narrow screens the sidebar follows the article.
- These are conceptual workflow illustrations, not real product screens, vendor logos, research evidence or guaranteed outcomes. Linked thumbnails are decorative; standalone article images have descriptive alt text.
- Tool-directory icons, reset charts and factual screenshots are not replaced by invented product imagery. Legacy posts and their URLs are untouched.

## Asset Pipeline

Generation mode: built-in `image_gen`, eight separate generation calls. No CLI/API-key fallback, external stock download or real vendor interface reference was used.

Selected originals are copied into `assets/images/editorial/`. The source copies remain in Codex's generated-image directory. `data/editorial_visuals.json` maps public article paths to the eight topics and defines the three home entry points.

`layouts/partials/aiplorer-editorial-image.html` generates uncropped 3:2 WebP variants at 240, 480 and 800 pixels wide (quality 80). It supplies width/height, responsive `srcset`, `sizes`, lazy loading and asynchronous decoding. PNG originals are not published. Generated `public/` and `resources/` output must not be staged.

| Topic | Workspace asset | Original generated filename |
| --- | --- | --- |
| Coding | `assets/images/editorial/coding.png` | `exec-d266d4d9-c2c5-47b4-b193-1ec60be50658.png` |
| Research | `assets/images/editorial/research.png` | `exec-97c1fe8b-3fcf-4b90-ba7b-fa6943c32799.png` |
| Presentation | `assets/images/editorial/presentation.png` | `exec-e3cc7a7a-5501-478f-ae7d-4f90652e0506.png` |
| Automation | `assets/images/editorial/automation.png` | `exec-f54b634d-cc57-4bf9-afd9-8b7d40cd29c4.png` |
| Creative media | `assets/images/editorial/creative.png` | `exec-d8af185c-5990-4866-a53b-aaed632ce305.png` |
| Meetings | `assets/images/editorial/meetings.png` | `exec-f89b5adb-e199-4204-819e-a4daddfca54a.png` |
| Writing | `assets/images/editorial/writing.png` | `exec-2a23bfc7-38b2-44c2-9a89-fb1800012520.png` |
| Choosing tools | `assets/images/editorial/choosing.png` | `exec-c71dbea9-dd18-4ade-9515-652b269d73c6.png` |

Original generation directory: `/Users/seongjinkim/.codex/generated_images/019e8261-db05-70e2-8540-dbe79254807c/`.

## Validation

- `node scripts/validate-editorial-images.mjs` checks all 15 article mappings, home link placement, both hub listings, image dimensions, all 24 responsive files, a 100 KB per-variant budget and 8 excluded drafts.
- Initial production variants total about 440 KB across all 24 files. A browser selects a variant rather than downloading all three sizes.
- Browser checks at widths 320, 390, 768 and 1440 cover home, guides, use cases and a representative decision guide. All 16 checks had no horizontal overflow or clipped card/title text.
- Visually inspected home and guide cards on mobile/desktop and the article sidebar on desktop. Confirmed a home task link navigates to the intended guide.
- On a 390px-wide home, search remains around 219px from the top and the first task guide starts around 625px. No carousel or additional JavaScript was introduced.
- Production build, draft build, and restored production build passed with Hugo 0.152.2. The existing raw-HTML warning for `content/posts/2025-11-07-ai-233254.md` remains; the post was not edited.
- The editorial-image validator, all 6 tool-finder tests, shortlist, Change Watch, reset-history and production-post URL validators passed. The 65-tool directory, 52 reset records and 291 unique legacy post URLs remain intact. Eight protected drafts appear in the draft build and are excluded again after production restoration.
- A real-browser home search for Cursor returned one tool after the image changes; clearing restored the directory. No new JavaScript or personal data storage was added.
- `git diff --check` passed. Existing uncommitted work was preserved; nothing was staged, committed or pushed.

## Final Prompt Set

### Coding

Use case: stylized-concept. Asset type: editorial illustration for an existing AI tool discovery website, Aiplorer; landscape 3:2. Subject: reviewing AI-generated code before merging. Create a refined tactile paper-and-ceramic miniature still life, viewed from a slightly elevated front angle: an open compact laptop with a clearly abstract code-diff pattern of green and coral line blocks (no readable text, not a real app screenshot), two paper revision sheets, a small magnifying lens examining the changes, and a pencil with a short checklist. Clean off-white studio surface, pale mint background, charcoal laptop trim, restrained emerald and coral accents with a small cobalt detail. Friendly and intelligent, physically grounded with soft contact shadows, crisp edges, subtle paper grain, no glossy plastic. Main objects occupy the central 75 percent and remain recognizable at thumbnail size; generous uncluttered margins. No people, faces, robots, stars, orbs, gradients, branding, logos, watermarks, words, letters, numerals, fake benchmark results, or futuristic neon. This is an illustrative work scene, not a depiction of Cursor or GitHub UI.

### Research

Use case: stylized-concept. Asset type: Aiplorer editorial illustration, landscape 3:2, no text. Subject: checking original sources and protecting sensitive research documents. A refined tactile paper-and-ceramic miniature still life viewed at a slightly elevated angle: an open reference book, three overlapping paper source sheets with abstract line marks, a large magnifying lens focusing on one highlighted passage, colored page tabs connecting the sheets, and a small cobalt-blue closed padlock beside a slim document folder. The objects clearly communicate careful source checking, not a claim of security. Pale ice-blue studio background and clean white desk, cobalt, coral, charcoal and a small leaf-green accent. Crisp, inviting, sophisticated editorial craft photography with paper grain, ceramic texture and soft contact shadows. Main objects fill central 75 percent, bold readable silhouettes for small thumbnails, no clutter. No people, faces, robots, logos, brands, readable text, letters, numbers, fake citations, stars, orbs, gradients, watermark, neon or glossy plastic. No generic laptop in this scene; the book, documents and lens are the subjects.

### Presentation

Use case: stylized-concept. Asset type: Aiplorer editorial illustration, landscape 3:2. Subject: turning a rough idea into a polished presentation. Create a crisp tactile paper-and-ceramic miniature scene: five small physical storyboard panels arranged in a deliberate sequence on a white desk, one larger upright slide board with a simple coral geometric composition and a small botanical picture, a few thumbnail paper images, a cobalt pencil and an unmarked review checklist. A clearly ordered visual narrative, no data or numerical chart. Pale coral studio backdrop, white paper, charcoal thin frames, coral and cobalt accents with one mustard-yellow detail. Elevated front angle; editorial craft photography, subtle paper grain and ceramic texture, soft contact shadows; friendly, useful and sophisticated. Bold central subjects, uncluttered margins, legible at thumbnail size. No people, faces, logos, brand names, actual app interfaces, readable text, letters, numerals, robots, stars, orbs, gradients, watermarks, neon, glossy plastic. The image is a conceptual presentation-workflow illustration, not a vendor feature claim.

### Automation

Use case: stylized-concept. Asset type: Aiplorer editorial workflow illustration, landscape 3:2. Subject: testing an automation before turning it on. A tactile paper-and-ceramic miniature on a clean white studio tabletop: several small thick ceramic blocks form one clear linked route, starting with a paper inbox tray, continuing through a small gear block and a human-review checkpoint represented by a clipboard and pencil, ending at a neat outbox tray. One coral branch curves back to an earlier block to suggest retry and recovery. Tangible thin colored cord connects the blocks, physically touching the desk, not a floating digital UI. Pale mint and light-blue backdrop, white ceramics, emerald connectors, coral retry branch and a mustard accent. Elevated three-quarter view, soft contact shadows, crisp paper texture, carefully arranged central composition, readable small thumbnails. No people, robots, orbs, brands, app logos, text, letters, numbers, watermarks, charts, neon, gradients or shiny plastic. Editorial concept only, not a literal product interface or guarantee of reliability.

### Creative Media

Use case: stylized-concept. Asset type: Aiplorer editorial illustration, landscape 3:2. Subject: planning a connected image, video and audio creative workflow. A refined tactile paper-and-ceramic miniature still life on a clean white desk, elevated three-quarter view. Main subjects are a compact cobalt cinema camera with a coral recording button, a ceramic microphone, a narrow paper filmstrip containing botanical landscape frames, and a neatly arranged physical creative brief sheet with color swatches and an abstract waveform cut from paper. Camera, mic, visual frames and brief tell one clear media-production story. Light lavender-grey studio background (not saturated purple), coral, cobalt, leaf green and warm yellow accents. Soft contact shadows, crisp paper grain, matte crafted textures, inviting editorial photography. Clear central arrangement recognizable as a small thumbnail, no excessive props. No people, faces, robots, logos, brand names, real app interface, readable words, letters, numerals, watermarks, orbs, glowing gradients, neon or glossy plastic. Illustrative workflow scene only, no claimed product output.

### Meetings

Use case: stylized-concept. Asset type: Aiplorer editorial illustration, landscape 3:2. Subject: turning meeting notes into reviewed action items. A refined tactile paper-and-ceramic miniature still life: a compact tabletop conference microphone, an open spiral notebook with abstract short lines, three separate action-note sheets with simple checkboxes, and a pencil laid across a small calendar grid without any numbers. A thin coral paper ribbon visually connects the spoken-note area to the organized action notes. Clean white table with soft sky-blue backdrop, cobalt microphone, yellow notebook edge, coral and mint paper tabs. Elevated front angle, soft contact shadows, crisp paper grain and matte ceramic details. Purposeful, cheerful and uncluttered, central 75-percent composition readable at thumbnail size. No people, faces, logos, brands, real software screenshot, readable words, letters, numerals, fake meeting transcripts, robot mascots, stars, orbs, gradients, watermarks, neon or glossy plastic. Illustration of a review workflow, not evidence of an actual recorded meeting.

### Writing

Use case: stylized-concept. Asset type: Aiplorer editorial illustration, landscape 3:2. Subject: revising a draft into a clear, considerate email. A refined tactile paper-and-ceramic miniature still life viewed from an elevated front angle: two paper drafts with short abstract charcoal line marks and a few coral revision strokes, a tidy final letter half inserted in an open cobalt envelope, a green pencil and three small paper tabs. A folded paper arrow gently connects the rough draft to the envelope. Clean white tabletop and a pale butter-yellow studio background, white paper, cobalt, emerald and coral accents. Crisp paper grain, matte ceramic texture, soft contact shadows. Purposeful, friendly, sophisticated; central objects remain readable at thumbnail size with uncluttered margins. No actual readable text, letters, numbers, logos, brands, software screenshots, people, faces, robots, stars, orbs, gradients, watermarks, neon or glossy plastic. Conceptual writing workflow only, not a real message or vendor output.

### Choosing Tools

Use case: stylized-concept. Asset type: Aiplorer editorial illustration, landscape 3:2. Subject: choosing an AI tool to fit a specific task, not ranking tools. A refined tactile paper-and-ceramic miniature still life, elevated three-quarter angle: three equal-sized upright white tiles show simple physical relief symbols of a pencil, a magnifying lens and a code bracket; a shared project brief made of paper with abstract lines lies before them; a cobalt adjustable measuring caliper and green pencil sit alongside a few coral paper tabs. The three options are equal in height and importance, no winner or podium. Clean white tabletop and a pale mint studio backdrop, cobalt, green, coral and one yellow accent. Matte ceramic, crisp paper grain, soft contact shadows, inviting sophisticated craft photography. Centered uncluttered arrangement, bold silhouettes legible in small thumbnails. No people, faces, robots, brand logos, actual software interfaces, readable text, letters, numbers, star ratings, awards, orbs, gradients, watermarks, neon or glossy plastic. An editorial task-fit concept, not a product capability or performance claim.
