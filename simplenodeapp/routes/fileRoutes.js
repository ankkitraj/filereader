const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Define the route to read the file
router.get('/read', fileController.readFile);

module.exports = router;