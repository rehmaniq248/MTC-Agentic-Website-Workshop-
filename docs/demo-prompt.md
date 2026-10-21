Build my personal portfolio website. Don't stop to ask me clarifying questions; everything you need is below. Use the superpowers skills to plan the build and test it as you go. Use plain HTML, CSS and JavaScript (ES modules) with no framework and no build step. Write unit tests with `node --test` (no dependencies). Serve the site locally with a small Python dev server that sends `Cache-Control: no-store`, so every refresh shows the latest edits. Put all site copy in one `js/content.js` file.

**Look:** a 90s arcade, Lakers-colored theme. Colors: purple #552583, gold #FDB927, black and white. Fonts (Google Fonts): Figtree for body text, Yellowtail for my cursive name, JetBrains Mono for the nav and the Connect/Career lists, and Press Start 2P for small arcade accents such as section numbers.

**Background:** replicate the animated background from https://www.mtcatucsd.org/ (I've attached a screenshot), recolored to Lakers colors. Build it as a full-page fixed canvas at opacity 0.8:
- Seeded 3D simplex noise, domain-warped, mapped through a 4-color palette: #05020A, #1A0B2E, #552583, #D9C27A.
- Render it at low resolution (8px cells), then blur it 120px.
- Overlay grayscale film grain with "overlay" blending at 0.35 alpha.
- Drift slowly at a 30fps cap. Pause when the tab is hidden, and show a still frame for reduced motion.

**Pages:** there are four separate pages: Home, Projects, Sports and Work.
- **Nav:** at the top of every page, centered, styled after my attached pill-nav reference, but transparent so it blends into the background (no pill, border or shadow). It holds a small round avatar (my GitHub profile picture, https://github.com/rehmaniq248.png), then Home · Projects · Sports · Work in monospace. The current page is white with a small gold dot under it; the others are dim.
- **Resume button:** a white pill in the top right, linking to my attached resume PDF.
- **Phones:** hide the avatar so the nav and the Resume button fit on one row.

**Home**
- In the center, a custom "IQ" logo (my nickname) drawn as an SVG. The I is a gold slab-serif bar, and the Q is a purple basketball with gold seams and a curved gold tail.
- Under the logo, "Rehman Iqbal" in glowing cursive (Yellowtail, cream with layered gold and purple neon glow). It writes itself in from left to right, then pulses slowly like a neon sign.
- Below the name, a gold uppercase, letter-spaced line: "Artificial Intelligence · UC San Diego".
- Then this bio: "AI student at UC San Diego. I build and ship real products with Claude, from e-commerce storefronts to RAG systems, and teach other students to do the same. Off the keyboard, I'm on the court."
- Scrolling down shows two sections styled exactly like my attached Connect/Career reference:
  - **Connect:** Instagram (https://www.instagram.com/iqbalrehman_/) · LinkedIn (https://www.linkedin.com/in/rehman-iqbal-90348137b/) · GitHub (https://github.com/rehmaniq248).
  - **Career:** each entry has a company logo, the company name, and a tree-branch line to "year  title", with a gold "● Now" on current roles. Entries: Chase USA International Inc., 2026, Artificial Intelligence Intern, Now (use the icon from chaseusa.com). Muslim Tech Collaborative, 2026, Education Committee, Now (use the logo from mtcatucsd.org).

**Projects**
- Show each project as an equal-size basketball backboard: a white glass board with an orange "shooter's square" holding a screenshot of the project, an orange rim and a white net underneath, then a short description and a "Take the shot ▶" link.
- Projects link to the deployed site if there is one, otherwise to GitHub, in a new tab.
- **RAG Interview Prep Study Buddy** (https://github.com/rehmaniq248/RAG-Interview-Prep-Study-Buddy). Stack: Python · Claude API · ChromaDB. It's a command-line tool with no frontend, so for its screenshot render the example terminal output from its README as a terminal window.
- **GrantMatcher** (https://github.com/rehmaniq248/DiamondHacksHackathonNonProfitMatcher). Stack: React · Claude API · Vercel. It's deployed at https://diamond-hacks-hackathon-non-profit.vercel.app, so link there and screenshot the live site.
- Take the descriptions from my resume.

**Sports**
- The lede: "Basketball is my other passion. More from the court soon."
- One gold, locked "Basketball Project" backboard with a 🏀 and a "COMING SOON" label. It isn't a link yet; I'll add the URL later.

**Work**
- Show my family's business, https://chaseusa.com/. The lede: "My family's wholesale apparel business, where I built the Shopify storefront. Visit the live site ↗".
- The site blocks iframes, so show a tall screenshot of its homepage inside a browser-style frame that scrolls internally. Clicking it opens the live site.

**Before calling it done**
- Check every page in a headless browser at 1440×900, 1366×625, 375×812 and 320×568.
- Confirm there's no sideways scrolling, no overlapping text, the nav never overlaps the Resume button, and all backboards are the same size.
- Show me screenshots.
