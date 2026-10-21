import { test } from 'node:test';
import assert from 'node:assert/strict';
import { backboardHTML, levelHTML } from '../js/render.js';
import { projects, experience } from '../js/content.js';

test('an experience entry renders as a numbered level with its role and highlights', () => {
  const html = levelHTML(experience[0], 2);
  assert.match(html, /LEVEL 2/);
  assert.match(html, /Artificial Intelligence Intern/);
  assert.match(html, /\+27%/);
});

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
  const html = backboardHTML(projects[2]);
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
