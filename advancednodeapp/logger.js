const { createLogger, transports, format } = require('winston'); // Import required Winston modules.
const path = require('path'); // Import path module for handling file paths.

// Create the Winston logger instance.
// We define two "transports" (output locations): the console and log files.
const logger = createLogger({
  level: 'info', // Set default logging level (info). This means it will log info, warnings, and errors.
  
  // Format the logs: Add a timestamp and customize the log message format.
  format: format.combine(
    format.timestamp(), // Add timestamp to each log message.
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Customize log output format.
    })
  ),
  
  // Define where the logs will be stored.
  transports: [
    new transports.Console(), // Logs will be printed to the console in real time.
    new transports.File({ filename: path.join(__dirname, 'logs/error.log'), level: 'error' }), // Errors go into error.log.
    new transports.File({ filename: path.join(__dirname, 'logs/combined.log') }) // All logs (info, warning, error) go into combined.log.
  ]
});

module.exports = logger; // Export the logger instance to use in other files.