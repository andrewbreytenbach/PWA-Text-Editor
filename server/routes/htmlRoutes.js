const path = require('path');

module.exports = (app) =>
  // Define a route handler for the root URL ("/")
  app.get('/', (req, res) =>
    // Send the index.html file as the response
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
