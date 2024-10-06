const client = require('prom-client');

// Create a registry to collect metrics
const register = new client.Registry();

// Create a counter metric to count requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Create a histogram to track response time
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5] // Response time buckets in seconds
});

// Register the metrics in Prometheus
register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);

// Export the register to use in the application
module.exports = { httpRequestCounter, httpRequestDuration, register };