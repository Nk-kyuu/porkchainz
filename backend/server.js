const express = require('express');
require('dotenv').config();
const test = require('./test')
const login = require('./login')

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/", test);
app.use("/", login);

const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
