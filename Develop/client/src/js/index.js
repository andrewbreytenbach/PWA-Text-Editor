import { Workbox } from 'workbox-window';
import Editor from './editor';
import { initializeDatabase } from './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

const initApp = async () => {
  const editor = new Editor();

  if (typeof editor === 'undefined') {
    loadSpinner();
  }
};

// Initialize the database
initializeDatabase();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

// Call the initApp function after the DOM has loaded
document.addEventListener('DOMContentLoaded', initApp);
