// Small HTML builders for the data in content.js.
import { projectLink } from './content.js';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

export function cartridgeHTML(project) {
  const link = projectLink(project);
  const classes = ['cartridge'];
  if (project.featured) classes.push('cartridge--featured');
  if (!link) classes.push('cartridge--locked');

  const inner = `
    <span class="cartridge__ridges" aria-hidden="true"></span>
    <span class="cartridge__label">
      <span class="cartridge__art">${project.featured ? '🏀' : ''}</span>
      <span class="cartridge__title">${escapeHTML(project.title)}</span>
      <span class="cartridge__stack">${escapeHTML(project.stack.join(' · '))}</span>
    </span>
    <span class="cartridge__desc">${escapeHTML(project.description)}</span>
    <span class="cartridge__cta">${link ? 'Press to play ▶' : 'COMING SOON'}</span>`;

  const id = `project-${escapeHTML(project.id)}`;
  if (!link) {
    return `<div class="${classes.join(' ')}" id="${id}" aria-disabled="true">${inner}</div>`;
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
