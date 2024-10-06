const express = require('express'); // Import Express.
const router = express.Router(); // Create a router instance.
const fileController = require('../controllers/fileController'); // Import the controller that handles file operations.

// Define the route to read the file.
// When a GET request is made to /file/read, call the readFile function in fileController.
router.get('/read', fileController.readFile);

module.exports = router; // Export the router so it can be used in server.js.