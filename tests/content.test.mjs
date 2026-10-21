import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects, experience, projectLink } from '../js/content.js';

test('projectLink prefers the deployed URL', () => {
  assert.equal(projectLink({ deployedUrl: 'https://a.app', githubUrl: 'https://github.com/x' }), 'https://a.app');
});

test('projectLink falls back to GitHub when not deployed', () => {
  assert.equal(projectLink({ githubUrl: 'https://github.com/x' }), 'https://github.com/x');
});

test('projectLink returns null when a project has no link yet', () => {
  assert.equal(projectLink({}), null);
});

test('projects are the two linked repos plus the basketball placeholder', () => {
  assert.deepEqual(projects.map((p) => p.id), ['rag-study-buddy', 'grantmatcher', 'basketball']);
  assert.equal(projects[0].githubUrl, 'https://github.com/rehmaniq248/RAG-Interview-Prep-Study-Buddy');
  assert.equal(projects[1].githubUrl, 'https://github.com/rehmaniq248/DiamondHacksHackathonNonProfitMatcher');
  assert.equal(projectLink(projects[2]), null);
});

test('most recent experience comes first', () => {
  assert.equal(experience[0].company, 'Chase USA International Inc.');
});
