const express = require('express');
require('dotenv').config();
const test = require('./test');
const pig = require('./pigTable');
const app = express();
//post

const cors = require('cors')


app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/", test);
app.use("/", pig);



const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
