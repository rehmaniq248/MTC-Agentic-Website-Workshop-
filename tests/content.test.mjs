import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects, sportsProjects, career, connect, work, projectLink } from '../js/content.js';

test('projectLink prefers the deployed URL', () => {
  assert.equal(projectLink({ deployedUrl: 'https://a.app', githubUrl: 'https://github.com/x' }), 'https://a.app');
});

test('projectLink falls back to GitHub when not deployed', () => {
  assert.equal(projectLink({ githubUrl: 'https://github.com/x' }), 'https://github.com/x');
});

test('projectLink returns null when a project has no link yet', () => {
  assert.equal(projectLink({}), null);
});

test('projects page lists the two linked repos; the basketball project lives on the sports page', () => {
  assert.deepEqual(projects.map((p) => p.id), ['rag-study-buddy', 'grantmatcher']);
  assert.equal(projects[0].githubUrl, 'https://github.com/rehmaniq248/RAG-Interview-Prep-Study-Buddy');
  assert.equal(projects[1].githubUrl, 'https://github.com/rehmaniq248/DiamondHacksHackathonNonProfitMatcher');
  assert.deepEqual(sportsProjects.map((p) => p.id), ['basketball']);
});

test('most recent workplace comes first in the career list', () => {
  assert.equal(career[0].company, 'Chase USA International Inc.');
});

test('connect lists Instagram, LinkedIn and GitHub in that order', () => {
  assert.deepEqual(connect.map((c) => c.label), ['Instagram', 'LinkedIn', 'GitHub']);
  assert.equal(connect[0].url, 'https://www.instagram.com/iqbalrehman_/');
  assert.equal(connect[2].url, 'https://github.com/rehmaniq248');
});

test('the work page points at the family business site', () => {
  assert.equal(work.url, 'https://chaseusa.com/');
});
