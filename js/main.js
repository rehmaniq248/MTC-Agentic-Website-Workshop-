// Entry point for every page: shared dock + background, then the page's own content.
import { role, bio, connect, career, projects, sportsProjects, work } from './content.js';
import { navHTML, connectHTML, careerHTML, backboardHTML, workHTML, escapeHTML } from './render.js';
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
  $('work-lede').innerHTML = work.url
    ? `My family's wholesale apparel business, where I built the Shopify storefront. <a href="${escapeHTML(work.url)}" target="_blank" rel="noopener noreferrer">Visit the live site ↗</a>`
    : 'A look at the family business. Site coming soon.';
  $('work-frame').innerHTML = workHTML(work);
}

startBackground($('bg'));
