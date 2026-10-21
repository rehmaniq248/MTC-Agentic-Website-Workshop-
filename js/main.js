// Entry point for every page: shared dock + background, then the page's own content.
import { role, bio, connect, career, projects, sportsProjects, work } from './content.js';
import { navHTML, connectHTML, careerHTML, backboardHTML, escapeHTML } from './render.js';
import { startBackground } from './background.js';

const page = document.body.dataset.page;
const $ = (id) => document.getElementById(id);

$('dock').innerHTML = navHTML(page);

if (page === 'home') {
  $('role').textContent = role;
  $('bio').textContent = bio;
  $('connect').innerHTML = connectHTML(connect);
  $('career').innerHTML = career.map(careerHTML).join('');
}

if (page === 'projects') $('shelf').innerHTML = projects.map(backboardHTML).join('');

if (page === 'sports') $('shelf').innerHTML = sportsProjects.map(backboardHTML).join('');

if (page === 'work') {
  if (work.url) {
    $('work-lede').innerHTML = `A look at ${escapeHTML(work.company)}. <a href="${escapeHTML(work.url)}" target="_blank" rel="noopener noreferrer">Open the full site ↗</a>`;
    $('work-frame').innerHTML = `
      <div class="work-frame__bar"><i></i><i></i><i></i><span>${escapeHTML(work.url)}</span></div>
      <iframe src="${escapeHTML(work.url)}" title="${escapeHTML(work.company)} website" loading="lazy"></iframe>`;
  } else {
    $('work-lede').textContent = 'A look at the family business. Site coming soon.';
    $('work-frame').innerHTML = '<div class="work-frame__empty">INSERT COIN · SITE LOADING SOON</div>';
  }
}

startBackground($('bg'));
