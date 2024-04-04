const express = require('express');
require('dotenv').config();

const test = require('./test')
const farmer = require('./farmer')
const batch = require('./batch')

const pig = require('./pigTable');
const farmerAdd = require('./farmerAdd') //add pig**
const farmerAddBatch = require('./farmerAddBatch') //add batch**
const slaughtererAdd = require('./slaughtererAdd') //add product**
const slaughtererSend = require('./slaughtererSend') //add product**
const login = require('./login')

const app = express();
//post

const cors = require('cors')


app.use(cors())
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

app.use("/", pig);


app.use("/", farmerAdd);
app.use("/", farmerAddBatch);
app.use("/", slaughtererAdd );
app.use("/", slaughtererSend );
app.use("/", login);

const port = process.env.PORT 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
