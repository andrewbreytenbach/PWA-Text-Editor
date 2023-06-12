import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner);
};

// Create an instance of the Editor class
const editor = new Editor();

// Check if the Editor instance is undefined
if (typeof editor === 'undefined') {
  loadSpinner(); // Display a loading spinner if the Editor instance is undefined
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Register the Workbox service worker
  const workboxSW = new Workbox('../service-worker.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
