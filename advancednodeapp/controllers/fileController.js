const fs = require('fs'); // Import the Node.js File System module for reading files.
const path = require('path'); // Import the path module to construct file paths.
const logger = require('../logger'); // Import our Winston logger to log file operations.

// Define the function to handle file reading.
exports.readFile = (req, res) => {
  const filePath = path.join(__dirname, '../data/big_sample.txt'); // Construct the path to the file.

  // Log that the file reading operation is starting.
  logger.info(`Reading file from: ${filePath}`);

  // Use the fs module to read the file asynchronously.
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // If an error occurs while reading the file, log the error and send a 500 response.
      logger.error(`Error reading file: ${err.message}`);
      return res.status(500).send('Error reading file'); // Respond with an error message.
    }

    // If the file is read successfully, log it and send the file content in the response.
    logger.info('File read successfully');
    res.send(data); // Send the file content as the response.
  });
};