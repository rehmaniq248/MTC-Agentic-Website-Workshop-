import { test } from 'node:test';
import assert from 'node:assert/strict';
import { backboardHTML, navHTML, connectHTML, careerHTML, workHTML } from '../js/render.js';

test('the work frame shows the site screenshot and links to the live site in a new tab', () => {
  const html = workHTML({ company: 'Chase USA International', url: 'https://chaseusa.com/', image: 'assets/projects/chaseusa.jpg' });
  assert.match(html, /href="https:\/\/chaseusa\.com\/" target="_blank"/);
  assert.match(html, /<img[^>]+src="assets\/projects\/chaseusa\.jpg"/);
  assert.match(html, /alt="Chase USA International website"/);
});

test('the work frame shows a placeholder until a site is set', () => {
  assert.match(workHTML({ company: 'x', url: null }), /INSERT COIN/);
});
import { projects, sportsProjects } from '../js/content.js';

test('a GitHub-only project renders as a link to its repo in a new tab', () => {
  const html = backboardHTML(projects[0]);
  assert.match(html, /href="https:\/\/github\.com\/rehmaniq248\/RAG-Interview-Prep-Study-Buddy"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /Python · Claude API · ChromaDB/);
});

test('a project with a screenshot shows it on the backboard', () => {
  const html = backboardHTML(projects[0]);
  assert.match(html, /<img[^>]+src="assets\/projects\/rag-study-buddy\.jpg"/);
  assert.match(html, /alt="RAG Interview Prep Study Buddy screenshot"/);
});

test('a deployed project links to its live site, not GitHub', () => {
  const html = backboardHTML(projects[1]);
  assert.match(html, /href="https:\/\/diamond-hacks-hackathon-non-profit\.vercel\.app"/);
});

test('the basketball project renders locked and featured, with no dead link', () => {
  const html = backboardHTML(sportsProjects[0]);
  assert.match(html, /backboard--locked/);
  assert.match(html, /backboard--featured/);
  assert.match(html, /COMING SOON/);
  assert.match(html, /id="project-basketball"/);
  assert.doesNotMatch(html, /href=/);
  assert.doesNotMatch(html, /<img/);
});

test('project text is escaped, not injected as HTML', () => {
  const html = backboardHTML({ id: 'x', title: 'A<b>&', stack: [], description: '', githubUrl: 'https://g' });
  assert.match(html, /A&lt;b&gt;&amp;/);
});

test('nav lists the four pages and marks only the current one', () => {
  const html = navHTML('projects');
  for (const [label, href] of [['Home', 'index.html'], ['Projects', 'projects.html'], ['Sports', 'sports.html'], ['Work', 'work.html']]) {
    assert.match(html, new RegExp(`href="${href.replace('.', '\\.')}"[^>]*>${label}<`));
  }
  assert.equal(html.match(/aria-current="page"/g).length, 1);
  assert.match(html, /href="projects\.html" aria-current="page"/);
});

test('connect links open in a new tab, and links without a URL are left out', () => {
  const html = connectHTML([
    { label: 'Instagram', url: null },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/x' },
    { label: 'GitHub', url: 'https://github.com/x' },
  ]);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/x" target="_blank" rel="noopener noreferrer">LinkedIn</);
  assert.match(html, /GitHub</);
  assert.doesNotMatch(html, /Instagram/);
});

test('a career entry shows the company, each role with its year, and a Now marker for current roles', () => {
  const html = careerHTML({
    company: 'Muslim Tech Collaborative',
    logo: 'assets/logos/mtc.png',
    roles: [{ year: '2026', title: 'Education Committee', now: true }],
  });
  assert.match(html, /Muslim Tech Collaborative/);
  assert.match(html, /<img[^>]+src="assets\/logos\/mtc\.png"/);
  assert.match(html, /2026/);
  assert.match(html, /Education Committee/);
  assert.match(html, /Now/);
});

test('a career entry without a logo falls back to its initial', () => {
  const html = careerHTML({ company: 'Chase USA International Inc.', roles: [{ year: '2026', title: 'AI Intern' }] });
  assert.match(html, /class="career__logo career__logo--initial"[^>]*>C</);
  assert.doesNotMatch(html, /Now/);
});
