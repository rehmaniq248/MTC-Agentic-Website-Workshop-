// Entry point: fills the page from content.js and starts the background.
import { bio, projects } from './content.js';
import { cartridgeHTML } from './render.js';
import { startBackground } from './background.js';

document.getElementById('bio').textContent = bio;
document.getElementById('shelf').innerHTML = projects.map(cartridgeHTML).join('');

startBackground(document.getElementById('bg'));
