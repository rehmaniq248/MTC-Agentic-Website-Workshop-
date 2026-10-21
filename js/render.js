// Small HTML builders for the data in content.js.
import { projectLink } from './content.js';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
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

export function levelHTML(item, levelNumber) {
  const highlights = item.highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join('');
  return `
    <li class="level">
      <span class="level__number">LEVEL ${levelNumber}</span>
      <div class="level__body">
        <h3 class="level__company">${escapeHTML(item.company)}</h3>
        <p class="level__meta">${escapeHTML(item.role)} · ${escapeHTML(item.dates)} · ${escapeHTML(item.location)}</p>
        <ul class="level__highlights">${highlights}</ul>
      </div>
    </li>`;
}
