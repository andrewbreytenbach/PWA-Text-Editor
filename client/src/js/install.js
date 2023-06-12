const butInstall = document.getElementById('buttonInstall');

// Event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();

  // Show the install button
  buttonInstall.style.visibility = 'visible';

  // Update the header text
  textHeader.textContent = 'Click the button to install!';

  // Event listener for install button click
  buttonInstall.addEventListener('click', () => {
    event.prompt(); // Show the install prompt
    buttonInstall.setAttribute('disabled', true); // Disable the install button
    buttonInstall.textContent = 'Installed!'; // Update the install button text
  });
});

// Event listener for appinstalled event
window.addEventListener('appinstalled', (event) => {
  // Update the header text
  textHeader.textContent = 'Successfully installed!';

  // Log the appinstalled event
  console.log('👍', 'appinstalled', event);
});
