import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cartridgeHTML } from '../js/render.js';
import { projects } from '../js/content.js';

test('a GitHub-only project renders as a link to its repo in a new tab', () => {
  const html = cartridgeHTML(projects[0]);
  assert.match(html, /href="https:\/\/github\.com\/rehmaniq248\/RAG-Interview-Prep-Study-Buddy"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /Python · Claude API · ChromaDB/);
});

test('the basketball project renders locked and featured, with no dead link', () => {
  const html = cartridgeHTML(projects[2]);
  assert.match(html, /cartridge--locked/);
  assert.match(html, /cartridge--featured/);
  assert.match(html, /COMING SOON/);
  assert.match(html, /id="project-basketball"/);
  assert.doesNotMatch(html, /href=/);
});

test('project text is escaped, not injected as HTML', () => {
  const html = cartridgeHTML({ id: 'x', title: 'A<b>&', stack: [], description: '', githubUrl: 'https://g' });
  assert.match(html, /A&lt;b&gt;&amp;/);
});
