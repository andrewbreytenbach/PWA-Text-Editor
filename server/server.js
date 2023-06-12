const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require and configure HTML routes
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
