const express = require('express');
require('dotenv').config();
const test = require('./test')
const farmerAdd = require('./farmerAdd') //add pig**
const farmerAddBatch = require('./farmerAddBatch') //add batch**
const slaughtererAdd = require('./slaughtererAdd') //add product**
const slaughtererSend = require('./slaughtererSend') //add product**
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/", test);
app.use("/", farmerAdd);
app.use("/", farmerAddBatch);
app.use("/", slaughtererAdd );
app.use("/", slaughtererSend );

const port = process.env.PORT 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
