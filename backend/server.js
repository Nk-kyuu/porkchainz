// Import the Express module
const express = require('express');
require('dotenv').config();

// Create an Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
