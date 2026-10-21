// Small HTML builders for the data in content.js.
import { projectLink } from './content.js';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

const PAGES = [
  { id: 'home', label: 'Home', href: 'index.html' },
  { id: 'projects', label: 'Projects', href: 'projects.html' },
  { id: 'sports', label: 'Sports', href: 'sports.html' },
  { id: 'work', label: 'Work', href: 'work.html' },
];

export function navHTML(active) {
  const links = PAGES.map(
    (p) => `<a class="dock__link" href="${p.href}"${p.id === active ? ' aria-current="page"' : ''}>${p.label}</a>`
  ).join('');
  return `<a class="dock__avatar" href="index.html" aria-label="Home"><img src="assets/portrait.png" alt=""></a>${links}`;
}

export function connectHTML(links) {
  return links
    .filter((l) => l.url)
    .map((l) => `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(l.label)}</a>`)
    .join('<span class="connect__sep" aria-hidden="true">·</span>');
}

export function careerHTML(entry) {
  const logo = entry.logo
    ? `<img class="career__logo" src="${escapeHTML(entry.logo)}" alt="">`
    : `<span class="career__logo career__logo--initial" aria-hidden="true">${escapeHTML(entry.company[0])}</span>`;
  const roles = entry.roles
    .map(
      (r) => `
      <li class="career__role">
        <span class="career__year">${escapeHTML(r.year)}</span>
        <span class="career__title">${escapeHTML(r.title)}</span>
        ${r.now ? '<span class="career__now">Now</span>' : ''}
      </li>`
    )
    .join('');
  return `
    <li class="career__entry">
      <div class="career__company">${logo}<span>${escapeHTML(entry.company)}</span></div>
      <ul class="career__roles">${roles}</ul>
    </li>`;
}

export function backboardHTML(project) {
  const link = projectLink(project);
  const classes = ['backboard'];
  if (project.featured) classes.push('backboard--featured');
  if (!link) classes.push('backboard--locked');

  const square = project.image
    ? `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)} screenshot" loading="lazy">`
    : '🏀';

  const inner = `
    <span class="backboard__board">
      <span class="backboard__square">${square}</span>
      <span class="backboard__title">${escapeHTML(project.title)}</span>
      <span class="backboard__stack">${escapeHTML(project.stack.join(' · '))}</span>
    </span>
    <span class="backboard__rim" aria-hidden="true"></span>
    <span class="backboard__net" aria-hidden="true"></span>
    <span class="backboard__desc">${escapeHTML(project.description)}</span>
    <span class="backboard__cta">${link ? 'Take the shot ▶' : 'COMING SOON'}</span>`;

  const id = `project-${escapeHTML(project.id)}`;
  if (!link) {
    return `<div class="${classes.join(' ')}" id="${id}">${inner}</div>`;
  }
  return `<a class="${classes.join(' ')}" id="${id}" href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
}
