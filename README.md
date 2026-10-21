# Rehman Iqbal — Portfolio

A 90s-arcade, Lakers-colored personal portfolio, built live with Claude Code for the Muslim Tech Collaborative agentic website workshop. Every prompt used to build it is in [prompts.txt](prompts.txt).

## Run it locally

```bash
npm start      # serves on http://localhost:8000 (python3 -m http.server)
npm test       # unit tests (node --test, no dependencies)
```

ES modules don't load from `file://`, so open it through the local server.

## Edit the content

All copy lives in [js/content.js](js/content.js): bio, connect links, career, projects, sports, the Work page URL and the resume path.
To point a project at a live site, add `deployedUrl` to it; otherwise it links to `githubUrl`.
Add `image` (a screenshot in `assets/projects/`) to show it on the backboard.
A project with no link shows as a locked "COMING SOON" backboard.

## How it's built

- `index.html` (Home), `projects.html`, `sports.html`, `work.html`: one page each, shared `css/styles.css`, no framework, no build step
- `js/main.js`: shared bottom dock + background, then fills the current page
- `js/background.js`: grain-gradient canvas replicating the background on mtcatucsd.org, in Lakers colors
- `js/render.js`: builds the dock, connect links, career list and project backboards from `content.js`
- `docs/superpowers/`: the design spec and build plan
- `.claude/skills/`: the skills used (superpowers, lavish)
