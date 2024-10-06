const express = require('express');
const { httpRequestCounter, httpRequestDuration, register } = require('./metrics');
const fileRoutes = require('./routes/fileRoutes');
const logger = require('./logger');

const app = express();
const port = 3000;

// Middleware to track request count and duration
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer(); // Start tracking duration
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : 'unknown',
      status_code: res.statusCode
    });

    end({
      method: req.method,
      route: req.route ? req.route.path : 'unknown',
      status_code: res.statusCode
    });
  });
  next();
});

// Expose the /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Other routes
app.use('/file', fileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});