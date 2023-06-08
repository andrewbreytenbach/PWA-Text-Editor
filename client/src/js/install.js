const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  console.log('butInstall-clicked');
  if (deferredPrompt) {
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User dismissed the installation');
    }

    // Reset the deferred prompt variable
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = 'none';
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed');
});

