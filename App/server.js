const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const app = express();
const port = 3000; // You can change the port to your desired value

// Create a Live Reload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + '/www'); // Watch the "www" folder for changes

// Attach the Live Reload middleware to your Express app
app.use(connectLivereload());

// Serve static files from the "www" folder
app.use(express.static(path.join(__dirname, 'www')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
