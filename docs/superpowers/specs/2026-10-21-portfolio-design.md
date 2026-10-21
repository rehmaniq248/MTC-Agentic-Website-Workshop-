# Rehman Iqbal — Personal Portfolio Site: Design

Date: 2026-10-21
Status: Approved as a starting point. Living document: Rehman will keep adding and changing design choices as the build goes; nothing is final until the finished site. Reference images are to be **replicated closely**, not loosely interpreted.

## Intent

A personal portfolio for Rehman Iqbal, a UCSD Artificial Intelligence student. It is also the live demo for an agentic website workshop (Muslim Tech Collaborative), so the code should stay simple enough to follow step by step.

**The one feeling a visitor should leave with: Rehman is passionate about basketball.** Every visual and interaction choice serves that alongside presenting his work.

## Goals

- A three-section, one-page scroll: **Cover** → **Projects** → **Experience**.
- 90s arcade retro look in **Lakers colors**: purple `#552583`, gold `#FDB927`, black, white.
- Basketball shows up in the interactions, not just the decoration (see "Basketball interactions").
- Every project links out: the deployed site if one exists, otherwise its GitHub repo.
- A visible **Resume** link to his resume PDF.

## Non-goals

- No blog, contact form, CMS, or backend.
- No framework or build step.
- No Image Captioning project (it's on the resume, but he didn't list it for the site).

## Anti-goals (failure even if it "works")

- Looks like a generic template portfolio, with basketball as an afterthought.
- Arcade gimmicks that make links hard to find or the text hard to read.
- Heavy enough to load slowly or stutter on a phone.

## Sections

### 1. Cover (layout "A", chosen)

Modeled on the Shopify Editions "Renaissance" reference (`docs/references/cover-reference.png`):

- **Giant name** "REHMAN IQBAL" anchored bottom-left, very large, overlapping the portrait.
- **Update (Rehman's call):** use his **GitHub profile picture** (cartoon avatar, https://github.com/rehmaniq248.png) instead of generating one. Its flat background is removed locally (flood fill from the edges), saved as `assets/portrait.png`. Nothing is uploaded. The original plan follows for reference.
- ~~AI-generated portrait~~ of Rehman in a **black hoodie** on the right, cut out (no background), overlapping the name the way the masked figure overlaps "Sidekick". Generated from his photo (`assets/source/rehman-photo.jpg`) using the Higgsfield image tools; **confirm with Rehman before uploading the photo / spending credits**. **Fallback** *(Claude's call)*: if he declines, generation fails, or the result looks off, use his real photo with the background removed and a duotone purple/gold treatment, so the layout is built the same either way.
- **Privacy** *(Claude's call)*: the original photo in `assets/source/` is git-ignored and never committed; only the final cut-out portrait is published.
- **Chapter list** down the left edge, roman-numeral style like the reference: `I Home`, `II Projects`, `III Experience`, plus `Resume`. These are anchor links.
- **Short bio** near the name. Rehman chose to have it drafted from his resume (LinkedIn couldn't be fetched). Draft:
  > AI student at UC San Diego. I build and ship real products with Claude, from e-commerce storefronts to RAG systems, and teach other students to do the same. Off the keyboard, I'm on the court.
- A **basketball** sits near the portrait; it is the "bullet" (see interactions).

### Background (all sections)

**Replicate** the MTC site background (`docs/references/background-reference.png`, live at https://www.mtcatucsd.org/), recolored to Lakers colors. Its exact technique, read from the site's code:

- A fixed, full-page `<canvas>` (`aria-hidden`, `pointer-events:none`, opacity 0.8) behind all content. Under it, the body has a 160° linear gradient (darkest → dark → mid color).
- **Noise field:** seeded 3D simplex noise, **domain-warped** (two noise lookups offset the coordinates of a third), plus a finer noise layer weighted by `grain` 0.9. The result is mapped through a **4-stop color palette** (a 256-entry lookup table).
- Rendered **low-res** (one sample per 8px cell, over-scanned by the blur radius), then drawn scaled up with `ctx.filter = blur(120px)`. That gives the soft, cloudy blobs.
- **Grain:** a second half-resolution canvas of grayscale noise at alpha 0.35, composited with `globalCompositeOperation = "overlay"`.
- Animated slowly (`speed` 0.18, `scale` 820, warp `amplitude` 60), capped at 30fps. It pauses when the tab is hidden, and with `prefers-reduced-motion` it renders a single still frame. It redraws on resize.
- The MTC palette is `#04070D, #0A192F, #1E3A8A, #A9B7D1` (near-black → navy → blue → pale blue-gray). **Lakers palette** *(Claude's call, tune by eye)*: `#05020A, #1A0B2E, #552583, #D9C27A`. That's near-black, deep purple, Lakers purple, and a muted gold, so the highlights read gold the way MTC's read pale.

The MTC site also uses the **Space Grotesk** font. Not adopted, since Rehman asked for Canva Sans. A subtle scanline overlay for the arcade feel is optional and must not muddy the grain.

### 2. Projects (layout "A", chosen: game cartridges)

Each project is an arcade **game cartridge** on a shelf. Clicking a cartridge "inserts" it (short animation) and then opens the link in a new tab.

| Cartridge | Stack label | Link |
|---|---|---|
| RAG Interview Prep Study Buddy | Python · Claude API · ChromaDB | https://github.com/rehmaniq248/RAG-Interview-Prep-Study-Buddy |
| GrantMatcher | React · Claude API · Vercel | https://github.com/rehmaniq248/DiamondHacksHackathonNonProfitMatcher |
| Basketball project (special) | TBD | **placeholder**; Rehman will supply the link later |

**Basketball cartridge until the link arrives** *(Claude's call)*: shown now, as the featured cartridge: gold, slightly larger, a "COMING SOON / LOCKED" label and a basketball icon. Title, description and stack get filled in when Rehman supplies the project.

Short descriptions for each come from the resume. If a project has a live deployment, use that URL instead of GitHub (none known today; keep the link a single easy-to-edit value per project).

### 3. Experience

Roles shown as arcade **levels**, most recent at top:

- **Chase USA International Inc.**, Artificial Intelligence Intern, Jun 2026–Present, San Ysidro, CA. Shopify storefront (12 custom sections, 10+ releases), +27% traffic / +35% orders, Python pipeline migrating 115+ products, QR trade-show tag system (+20% efficiency).
- **Muslim Tech Collaborative**, Education Committee, Jun 2026–Present, San Diego, CA. Designed and open-sourced a Claude Code workshop; built custom MCP servers, skills, and agents for it.

Education (UCSD, B.S. AI, expected Spring 2028) can appear as a small line here or on the cover; builder's call.

## Basketball interactions

- **Ball as bullet → hoop (required):** clicking the ball on the cover shoots it in an arc through a hoop, then takes the visitor to the basketball project. Until the link exists, it scrolls to that cartridge on the Projects page.
- Further touches are the builder's call, as long as they stay light (examples: ball cursor/hover, a swish on cartridge click, scoreboard-style labels like "1UP" or "HI-SCORE"). Respect `prefers-reduced-motion`.

## Visual details decided

- Colors: Lakers purple, gold, black, white.
- **Font:** Rehman asked for **Canva Sans**. It is not a freely licensed web font, so use a close free substitute (e.g. a geometric sans from Google Fonts) for body and headings, plus a **pixel font** (e.g. Press Start 2P) for arcade accents: chapter numerals, labels, scores. *(Claude's call.)*

## How it gets made (Claude's calls; Rehman delegated these)

- Plain **HTML, CSS, JavaScript**, no build step, no framework.
- Deploy on **GitHub Pages** from the repo `rehmaniq248/MTC-Agentic-Website-Workshop-`.
- Resume PDF copied into the repo at `assets/RehmanIqbal_Resume.pdf` (source: `~/Downloads/RehmanIqbal_Qualcomm_ML_AI.pdf`).
- Use the superpowers workflow (plan → implement → review) and the **lavish** skill for visual review pages, per Rehman's preference.
- Must work on phones: name scales down, portrait stacks, no horizontal scroll.

## Build order (workshop)

Rehman will rebuild this live in the workshop, step by step, using the prompts recorded in `prompts.txt` from this session. So the build must go in **short steps that each produce something visible** in the browser, in roughly this order: background → cover (name, bio, chapter list, portrait) → projects cartridges → experience levels → basketball interactions → polish/mobile → deploy. The fancier effects (grain, CRT, ball arc) stay small and self-contained enough to explain in a sentence or two.

## Left to the builder

- Exact animation timing and easing, cartridge art details, grain/gradient technique.
- File/folder layout.
- Which extra basketball touches to add (within the "light" rule above).
