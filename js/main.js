// Entry point: fills the page from content.js and starts the background.
import { bio, education, projects, experience } from './content.js';
import { cartridgeHTML, levelHTML } from './render.js';
import { startBackground } from './background.js';

document.getElementById('bio').textContent = bio;
document.getElementById('shelf').innerHTML = projects.map(cartridgeHTML).join('');
document.getElementById('education').textContent = education;
// Most recent role gets the highest level number.
document.getElementById('levels').innerHTML = experience
  .map((item, i) => levelHTML(item, experience.length - i))
  .join('');

startBackground(document.getElementById('bg'));
