# Text Editor Starter Code

## About The Project

The goal of this project was to create a Progressive Web App (PWA) text editor using JavaScript code. The text editor allows users to write and edit text in a web-based interface.

The project consists of several files and folders. The server folder contains the server-side code, including the Express.js routes for handling HTTP requests. The client folder contains the client-side code, including HTML, CSS, and JavaScript files.

The main functionality of the text editor is implemented using CodeMirror, a versatile text editor library for the browser. The editor.js file defines the Editor class, which initializes and manages the CodeMirror editor instance. It provides features such as syntax highlighting, line numbers, and auto-indentation.

The text content entered in the editor is stored in an IndexedDB database using the database.js file. The putDb function saves the content to the database, while the getDb function retrieves the content from the database. This allows users to save and retrieve their text content even when they revisit the app later.

The client-side JavaScript files are bundled using webpack, as configured in the webpack.config.js file. This enables efficient packaging and optimization of the code for deployment.

The project also includes service worker functionality for offline support and caching using the Workbox library. The src-sw.js file defines the service worker code, which caches the application shell and other essential resources for offline access.

Overall, this project provides a functional and offline-capable text editor that can be accessed as a web app.

## Built With

* JavaScript
* HTML
* CSS
* CodeMirror
* IndexedDB
* Webpack
* Workbox

## Getting Started
To access the PWA Text Editor, you can visit the following webpage: [Add deployed URL here]

To run the project locally, follow these steps:

1. Clone the repository: [https://github.com/andrewbreytenbach/pwa-text-editor]
2. Navigate to the project directory.
3. Install the dependencies by running npm install.
4. Build the client-side code using npm run build.
5. Start the server using npm start.
6. Access the text editor in your web browser at http://localhost:3000.

## Usage
When you open the PWA Text Editor, you will see a blank editor interface where you can start typing and editing text.

Text Editor

![New Search](/assets/images/new-search.png "New Search")

The editor provides features such as syntax highlighting, line numbers, and auto-indentation to enhance your text editing experience.

To save your text content, the editor automatically stores the content in the background using IndexedDB. This allows you to access and retrieve your text content even if you close the browser or revisit the app later.

![New Search](/assets/images/new-search.png "New Search")

You can use the toolbar or keyboard shortcuts to perform common text editing actions, such as copying, pasting, and undo/redo.

![New Search](/assets/images/new-search.png "New Search")

To customize the editor's appearance or behavior, you can modify the CSS styles and JavaScript code as needed.

## Contact
Andrew Breytenbach

## Project Link: 
* [https://github.com/andrewbreytenbach/pwa-text-editor] (Github)
* [https://pwatext-editor-19.herokuapp.com/] (Heroku)


## Acknowledgments
* [https://codemirror.net/] (CodeMirror)
* [https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API] (IndexedDB)
* [https://webpack.js.org/] (Webpack)
* [https://github.com/GoogleChrome/workbox] (Workbox)
* [https://github.com/coding-boot-camp/cautious-meme] (Starter Code)
