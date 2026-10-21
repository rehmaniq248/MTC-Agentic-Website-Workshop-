# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Rehman Iqbal's one-page arcade/Lakers portfolio (Cover → Projects → Experience) as a static site, in short steps that each show something new in the browser.

**Architecture:** One `index.html` with three `<section>`s. Plain ES modules: content lives in one data module, and small modules render the projects and experience from that data. A canvas module replicates the MTC grain-gradient background. Pure logic (links, palette, noise, HTML builders) is unit-tested with Node's built-in test runner. Visuals are checked in the browser.

**Tech Stack:** HTML, CSS, vanilla JS (ES modules), `node --test` (no npm dependencies), Google Fonts, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-21-portfolio-design.md`

## Global Constraints

- No framework, no bundler, no npm dependencies. The site must run by opening it from a static server.
- Colors: purple `#552583`, gold `#FDB927`, black, white. Background palette `#05020A, #1A0B2E, #552583, #D9C27A`.
- Fonts: **Figtree** (400/700/900, Google Fonts) stands in for Canva Sans. **Press Start 2P** for arcade accents only (numerals, labels, scores).
- Project links open in a new tab (`target="_blank" rel="noopener noreferrer"`). Use the deployed URL when present, otherwise GitHub.
- Resume link → `assets/RehmanIqbal_Resume.pdf`.
- `assets/source/` is never committed (already in `.gitignore`).
- **Animations and transitions are out of scope for this plan.** Rehman adds them in later prompts: the ball arc through the hoop, the cartridge insert, section transitions. Build the static elements and the working links/anchors those animations will hook into. The background's slow drift is part of the replicated reference, so it stays.
- Respect `prefers-reduced-motion`: the background renders one still frame.
- Works at 375px wide with no horizontal scroll.
- Serve locally with `python3 -m http.server 8000` (ES modules don't load over `file://`).

## Review Focus

1. **Project with no `deployedUrl`** (every project today): the link must be the GitHub URL, never `undefined` or `#`. Tested in Task 1.
2. **Basketball project with no URL yet**: its cartridge must render as locked/"COMING SOON" and must not be a dead link. Tested in Tasks 1 and 4.
3. **Phone width (375px)**: the giant name must not overflow horizontally. Checked in Task 6.
4. **Reduced motion / hidden tab**: the background must not keep animating. Checked in Task 2.
5. **Project text with `<` or `&`**: rendered as text, not HTML. Tested in Task 4 (`escapeHTML`).

## File Structure

```
index.html              page shell: nav, three sections, script tag
css/styles.css          all styles (tokens on :root)
js/content.js           bio, projects, experience data + projectLink()
js/palette.js           buildPaletteLUT()
js/noise.js             createNoise3D(seed) – seeded simplex noise
js/background.js        startBackground(canvas, options) – MTC canvas replica
js/render.js            escapeHTML(), cartridgeHTML(), levelHTML()
js/main.js              entry: renders sections, starts background
tests/*.test.mjs        node --test unit tests
package.json            { "type": "module", "scripts": { "test": "node --test tests/" } }
assets/portrait.png     final cut-out portrait (Task 5)
```

---

### Task 1: Page shell + content data

**Files:**
- Create: `package.json`, `index.html`, `css/styles.css`, `js/content.js`, `js/main.js`
- Test: `tests/content.test.mjs`

**Interfaces:**
- Produces, from `js/content.js`:
  - `export const bio: string`. The spec's draft bio, verbatim.
  - `export const projects: Array<{ id, title, stack: string[], description, githubUrl?: string, deployedUrl?: string, featured?: boolean }>`. Ids are `"rag-study-buddy"`, `"grantmatcher"`, `"basketball"`. Basketball has `featured: true` and no URLs.
  - `export const experience: Array<{ company, role, dates, location, highlights: string[] }>`. Chase USA first, then MTC, with highlights from the spec.
  - `export function projectLink(project): string | null`. Returns `deployedUrl`, else `githubUrl`, else `null`.
- Produces, in `index.html`: `<section id="home">`, `<section id="projects">` containing `<div class="shelf" id="shelf">`, and `<section id="experience">` containing `<ol class="levels" id="levels">`. Also `<canvas id="bg" aria-hidden="true">`, a left chapter nav (`I Home`, `II Projects`, `III Experience`, `Resume`) linking to `#home`, `#projects`, `#experience`, and the PDF.

- [ ] **Step 1: Write the failing test** `tests/content.test.mjs`:
  - `projectLink({deployedUrl:'https://a.app', githubUrl:'https://github.com/x'})` → `'https://a.app'`
  - `projectLink({githubUrl:'https://github.com/x'})` → `'https://github.com/x'`
  - `projectLink({})` → `null`
  - The `projects` ids equal `['rag-study-buddy','grantmatcher','basketball']`. The RAG `githubUrl` is `https://github.com/rehmaniq248/RAG-Interview-Prep-Study-Buddy`, and GrantMatcher's is `https://github.com/rehmaniq248/DiamondHacksHackathonNonProfitMatcher`.
  - `experience[0].company === 'Chase USA International Inc.'`
- [ ] **Step 2:** Run `npm test`. Expected: FAIL (module not found).
- [ ] **Step 3:** Implement `js/content.js`, plus `package.json`, and an `index.html` and `css/styles.css` shell. The shell has the sections above, the fonts linked, the `:root` color tokens, and a black body.
- [ ] **Step 4:** Run `npm test`. Expected: PASS. Then `python3 -m http.server 8000`, open `http://localhost:8000`. Expected: black page, chapter nav visible, the anchors scroll.
- [ ] **Step 5: Commit** `feat: page shell and content data`

### Task 2: MTC background replica

**Files:**
- Create: `js/palette.js`, `js/noise.js`, `js/background.js`
- Modify: `js/main.js` (call `startBackground`), `css/styles.css` (fixed canvas + body gradient)
- Test: `tests/palette.test.mjs`, `tests/noise.test.mjs`

**Interfaces:**
- `buildPaletteLUT(colors: string[]): Uint8Array`. Length 768 (256 × RGB), with a linear blend between evenly spaced stops.
- `createNoise3D(seed: number): (x, y, z) => number`. Seeded simplex noise in [-1, 1], deterministic for the same seed.
- `startBackground(canvas: HTMLCanvasElement, opts?): () => void`. Returns a stop function. The defaults are the spec's values: `colors` = background palette, `amplitude 60, scale 820, speed 0.18, grain 0.9, resolution 8, fpsCap 30, opacity 0.8, blur 120`.

- [ ] **Step 1: Write failing tests:**
  - `buildPaletteLUT(['#000000','#ffffff'])`: length 768, first three bytes `0,0,0`, last three `255,255,255`.
  - `buildPaletteLUT(['#552583'])`: every entry is `85,37,131`.
  - The same seed gives the same `noise(0.3,1.7,2.1)`. Different seeds differ. 1000 random samples all fall in [-1, 1].
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement the three modules. `background.js` follows the spec's algorithm exactly: a low-res domain-warped field, mapped through the LUT, drawn with `ctx.filter = blur(120px)` and over-scanned by the blur radius, then the half-res grain at alpha 0.35 composited with `overlay`. It caps fps, pauses on `visibilitychange`, renders one frame under reduced motion, and resizes with a `ResizeObserver`. CSS: canvas `position:fixed; inset:0; z-index:-1; pointer-events:none`; body background `linear-gradient(160deg, #05020A, #1A0B2E 45%, #552583 130%)`.
- [ ] **Step 4:** Run `npm test`. Expected: PASS. In the browser, compare side by side with `docs/references/background-reference.png`: soft purple/gold clouds, visible grain, slow drift. With DevTools "Emulate prefers-reduced-motion", the frame is still.
- [ ] **Step 5: Commit** `feat: grain gradient background (MTC replica, Lakers palette)`

### Task 3: Cover (layout A)

**Files:**
- Modify: `index.html` (`#home`), `css/styles.css`, `js/main.js` (insert `bio`)
- Create: `assets/portrait-placeholder.svg` (hooded silhouette, used until Task 5)

**Interfaces:**
- Consumes: `bio` from `content.js`.
- Produces: `<img class="portrait" id="portrait">`, `<h1 class="giant-name">REHMAN IQBAL</h1>`, `<p class="bio" id="bio">`, and a `<button class="ball" id="ball" aria-label="Shoot to the basketball project">` that jumps to `#project-basketball` (the animation comes later).

- [ ] **Step 1:** Build the cover to match `docs/references/cover-reference.png`:
  - The giant name is bottom-left (Figtree 900, roughly `clamp(4rem, 14vw, 13rem)`, tight leading, white), with the portrait on the right overlapping it. Put the name above the portrait in z-order, the way "Sidekick" sits over the figure.
  - The chapter list sits down the left edge, with Press Start 2P roman numerals right-aligned beside it, like the reference. A small top bar carries the name/wordmark on the left and the Resume link on the right.
  - The bio sits near the name.
- [ ] **Step 2:** Verify in the browser at 1440px against the reference: the overlap, the chapter-list placement, and the scale of the name. Clicking the ball scrolls to the Projects section.
- [ ] **Step 3: Commit** `feat: cover section`

### Task 4: Projects shelf (game cartridges)

**Files:**
- Create: `js/render.js`
- Modify: `js/main.js` (fill `#shelf`), `css/styles.css`
- Test: `tests/render.test.mjs`

**Interfaces:**
- `escapeHTML(s: string): string`. Escapes `& < > " '`.
- `cartridgeHTML(project): string`. Returns an `<a class="cartridge" id="project-{id}" href={projectLink} target="_blank" rel="noopener noreferrer">` holding the title, the stack joined with ` · `, and the description. When `projectLink` is `null`, it returns a `<div class="cartridge cartridge--locked" id="project-{id}" aria-disabled="true">` with a `COMING SOON` label instead (no href). `featured` adds `cartridge--featured`.

- [ ] **Step 1: Write failing tests:**
  - The RAG project's HTML contains its GitHub href, `target="_blank"`, and `Python · Claude API · ChromaDB`.
  - The basketball project's HTML contains `cartridge--locked`, `cartridge--featured`, and `COMING SOON`, and does not contain `href=`.
  - `cartridgeHTML({id:'x', title:'A<b>&', stack:[], description:'', githubUrl:'https://g'})` contains `A&lt;b&gt;&amp;`.
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement. Cartridges are styled as 90s game cartridges: a black body, a gold label strip, a purple label art area, and a ridged top. The featured one is gold and larger, with a 🏀 mark. Lay the shelf out as a flex row that wraps.
- [ ] **Step 4:** Run `npm test`. Expected: PASS. In the browser, clicking a cartridge opens GitHub in a new tab. The basketball cartridge is not clickable, and the cover ball now lands on it.
- [ ] **Step 5: Commit** `feat: project cartridges`

### Task 5: Experience levels + portrait

**Files:**
- Modify: `js/render.js` (add `levelHTML`), `js/main.js` (fill `#levels`), `css/styles.css`, `index.html` (portrait `src`)
- Create: `assets/portrait.png`
- Test: `tests/render.test.mjs`

**Interfaces:**
- `levelHTML(item, levelNumber: number): string`. Returns an `<li class="level">` with a `LEVEL {n}` label (Press Start 2P, gold), the company, role, dates, location, and a `<ul>` of escaped highlights. `main.js` numbers them so the most recent role has the highest level (Chase = LEVEL 2, MTC = LEVEL 1).

- [ ] **Step 1: Write a failing test:** `levelHTML(experience[0], 2)` contains `LEVEL 2`, `Artificial Intelligence Intern`, and `+27%`.
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement and style it. Add the UCSD education line (B.S. Artificial Intelligence, expected Spring 2028) as a small line above the levels.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5: Portrait. Ask Rehman before uploading his photo or spending credits.** Then generate with the Higgsfield image tools from `assets/source/rehman-photo.jpg`: same person, black hoodie, waist-up, three-quarter pose like the reference figure, background removed (PNG with transparency). Save it as `assets/portrait.png` and swap the cover `src`. Fallback, if he declines or the result is off: remove the background from his real photo and apply a purple/gold duotone in CSS.
- [ ] **Step 6:** Compare in the browser with the reference: the portrait overlaps the name convincingly.
- [ ] **Step 7: Commit** `feat: experience levels and portrait`

### Task 6: Mobile pass + deploy

**Files:**
- Modify: `css/styles.css`
- Create: `README.md` (what it is, how to run locally, where to edit content)

- [ ] **Step 1:** Add the responsive styles. Under 768px, the name scales down and sits above the portrait, the chapter nav collapses into a top row, and the cartridges stack.
- [ ] **Step 2:** Verify in DevTools at 375px and 768px: `document.documentElement.scrollWidth === innerWidth`, the name is fully visible, and every link is tappable.
- [ ] **Step 3:** Run `npm test`. Expected: all PASS.
- [ ] **Step 4: Commit** `feat: responsive layout`
- [ ] **Step 5: Ask Rehman before pushing.** Then `git push -u origin main`, and enable GitHub Pages (Settings → Pages → Deploy from branch `main`, `/` root, or run `gh api` if he prefers). Verify the Pages URL loads with the background, the fonts, the resume PDF and the project links working.
