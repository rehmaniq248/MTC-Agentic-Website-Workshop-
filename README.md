# Agentic Website Workshop: Build Your Portfolio with Claude Code

**Muslim Tech Collaborative @ UC San Diego**

Hey! I'm Rehman, a 2nd year AI major at UCSD. This repo is the demo for our agentic website workshop. In it I build my whole personal portfolio site by talking to an AI agent (Claude Code) instead of writing the code by hand.

**See the finished site:** https://rehmaniq248.github.io/MTC-Agentic-Website-Workshop-/

## What this workshop is about

Most people use AI like a search engine: ask a question, copy the answer, paste it somewhere. An **agent** is different. You give it a goal, and it plans the work, writes the files, runs the tests, opens the site in a browser to check it, and fixes what's broken. It keeps going until the job is done.

The point of this workshop is to show you how to **direct** an agent well:

1. **Describe what you want clearly.** Give it colors, fonts, pages and links. Reference images help a lot.
2. **Give it skills.** These are reusable instruction packs that make it plan, test and review its own work.
3. **Iterate.** Look at what it made, say what to change, and repeat. My site went through about four rounds of redesign.
4. **Ship it.** Put it on GitHub Pages so you get a real link for your resume and LinkedIn.

By the end you'll have your own portfolio site live on the internet.

## What you need before the workshop

- [ ] A **GitHub account**: https://github.com/signup
- [ ] **Claude Code** installed: https://claude.com/claude-code (the terminal app or the VS Code extension both work)
- [ ] **Git**. Check with `git --version`.
- [ ] **Python 3**, for the local preview server. Check with `python3 --version`.
- [ ] **Node.js 18+**, only needed to run the tests. Check with `node --version`.
- [ ] Your **resume as a PDF**, plus links to your projects, LinkedIn and GitHub
- [ ] Optional: a few **screenshots of websites you like**, to use as reference images

## Step by step

### 1. Make a new repo and folder

Create an empty repo on GitHub (for example `my-portfolio`), then clone it:

```bash
git clone https://github.com/<your-username>/my-portfolio.git
cd my-portfolio
```

### 2. Copy the skills and the prompt logger from this repo

The `.claude/` folder is what makes the agent work well. It has two parts:

- **`.claude/skills/`**: the [superpowers](https://github.com/obra/superpowers) skills, which make Claude brainstorm, write a plan, test as it goes and review its work, plus [lavish](https://github.com/kunchenguid/lavish-axi), which turns plans and comparisons into visual pages you can look at.
- **`.claude/hooks/log-prompt.py`**: a small hook that saves every prompt you type to `prompts.txt`. That way you have a record of exactly how you built your site.

Copy it into your folder:

```bash
git clone https://github.com/rehmaniq248/MTC-Agentic-Website-Workshop-.git ../workshop-demo
cp -R ../workshop-demo/.claude .
```

### 3. Open Claude Code in your folder

```bash
claude
```

Or open the folder in VS Code and start the Claude Code extension.

### 4. Write your build prompt

Open [docs/demo-prompt.md](docs/demo-prompt.md). It's the exact one-shot prompt I use to rebuild my site from scratch. Use it as a **template**:

- Swap my name, bio, colors, fonts and links for yours.
- Keep the structure: **Look → Background → Pages → each page's content → "Before calling it done"**.
- Keep the last section, where you ask it to check the site at different screen sizes and show you screenshots. That's what makes it test its own work instead of just saying "done."

Not sure what you want yet? Just describe the vibe ("90s arcade, Lakers colors, I love basketball") and end the prompt with **"Ask any clarifying questions."** That's how I started. My first prompt is at the top of [prompts.txt](prompts.txt).

### 5. Paste it in and attach your images

Paste the prompt into Claude Code and drag in your files: your resume PDF and any reference screenshots. For my demo I attach:

- a screenshot of the [MTC website](https://www.mtcatucsd.org/), whose background I copied in my colors
- a screenshot of a nav bar I liked
- a screenshot of a Connect/Career section I liked
- my resume PDF

Then let it work. It'll plan, build, test, and show you screenshots when it's done.

### 6. Preview it locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. If you copied my setup, `npm start` does the same thing but turns off caching. If a change doesn't show up, do a hard refresh with **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows).

### 7. Iterate

This is the fun part. Look at your site and tell Claude what to change, in plain English. Some real prompts from my build:

> "Move my name above the nav and put my bio under it. Format it nicely and professionally."

> "Instead of having the bar on the bottom, put it on the top and have it blend into the background."

> "Use my GitHub profile picture instead of generating a new one."

If it's a visual change, **attach a screenshot of what you mean**. The agent gets much closer when it can see the reference than when you only describe it.

### 8. Deploy to GitHub Pages

Ask Claude:

> "Commit everything, push to main, and turn on GitHub Pages."

Or do it yourself: push to `main`, then on GitHub go to **Settings → Pages → Deploy from a branch → `main` / root**. After a minute or two your site is live at:

```
https://<your-username>.github.io/<repo-name>/
```

Every push to `main` after that updates the site automatically.

## Tips I learned building this

- **Be specific.** "Make it look cool" gets you a template. "Lakers purple #552583, gold #FDB927, cursive name that glows like a neon sign" gets you *your* site.
- **Reference images beat descriptions.** If you saw it on another site, screenshot it and tell Claude to replicate it. Include the URL if you have it.
- **Nothing is final.** Redesign as many times as you want. Changing your mind is cheap now.
- **Review before you push.** The agent asks before doing anything public, like pushing or publishing. Actually look at what it's about to ship.
- **Keep your prompts.** `prompts.txt` is basically the recipe for your site. It's also a great thing to show when people ask how you made it.

## What's in this repo

| Path | What it is |
|---|---|
| `index.html`, `projects.html`, `sports.html`, `work.html` | The four pages of my site |
| `js/content.js` | **All the text and links.** Edit this one file to change the content. |
| `js/background.js` | The animated grainy background, copied from mtcatucsd.org in Lakers colors |
| `js/render.js`, `js/main.js` | Build the nav, project cards and career list from `content.js` |
| `css/styles.css` | All the styling |
| `tests/` | Unit tests. Run them with `npm test`. |
| `docs/demo-prompt.md` | The one-shot prompt that rebuilds this site |
| `docs/superpowers/` | The design spec and build plan Claude wrote during the build |
| `prompts.txt` | Every prompt I typed, in order |
| `.claude/` | Skills and the prompt-logging hook |

## Run my version locally

```bash
npm start   # http://localhost:8000, caching off
npm test    # unit tests, no installs needed
```

You need a local server because the site uses ES modules, and those don't load when you open the HTML file directly.

---

Questions? Find me at an MTC event or message me on [LinkedIn](https://www.linkedin.com/in/rehman-iqbal-90348137b/).
