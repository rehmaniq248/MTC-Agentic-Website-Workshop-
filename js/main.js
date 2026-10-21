// Entry point: fills the page from content.js and starts the background.
import { bio } from './content.js';
import { startBackground } from './background.js';

document.getElementById('bio').textContent = bio;

startBackground(document.getElementById('bg'));
