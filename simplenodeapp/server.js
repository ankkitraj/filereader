const express = require('express');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const port = 3000;

// Use routes defined in fileRoutes.js
app.use('/file', fileRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});