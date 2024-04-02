// Import the Express module
const express = require('express');
require('dotenv').config();
const test = require('./test')
const farmer = require('./farmer')
const batch = require('./batch')

// Create an Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
// const logger = (req, res, next) => {
//   console.log(`${req.protocol}://${req.get('host')}${req.orinalUrl}`);
//   next();
// }

// app.use(logger);

app.use("/", test);

app.use("/", farmer);

app.use("/", batch);

const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
