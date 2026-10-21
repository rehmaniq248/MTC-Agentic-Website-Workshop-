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
