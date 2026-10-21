# Rehman Iqbal — Portfolio

A 90s-arcade, Lakers-colored personal portfolio, built live with Claude Code for the Muslim Tech Collaborative agentic website workshop. Every prompt used to build it is in [prompts.txt](prompts.txt).

## Run it locally

```bash
npm start      # serves on http://localhost:8000 (python3 -m http.server)
npm test       # unit tests (node --test, no dependencies)
```

ES modules don't load from `file://`, so open it through the local server.

## Edit the content

All copy lives in [js/content.js](js/content.js): bio, projects, experience, resume path.
To point a project at a live site, add `deployedUrl` to it; otherwise it links to `githubUrl`.
A project with neither shows as a locked "COMING SOON" cartridge.

## How it's built

- `index.html`, `css/styles.css`: plain HTML/CSS, no framework, no build step
- `js/background.js`: grain-gradient canvas replicating the background on mtcatucsd.org, in Lakers colors
- `js/render.js`: builds the project cartridges and experience levels from `content.js`
- `docs/superpowers/`: the design spec and build plan
- `.claude/skills/`: the skills used (superpowers, lavish)
