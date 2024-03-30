const express = require('express');
require('dotenv').config();
const test = require('./test')

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/", test);

const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
