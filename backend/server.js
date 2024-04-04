const express = require('express');
require('dotenv').config();

const test = require('./test')
const farmer = require('./farmer')



const batch = require('./batchTable');
const pig = require('./pigTable'); // get data pig 
const farmerAdd = require('./farmerAdd') //add pig**
const farmerAddBatch = require('./farmerAddBatch') //add batch**
const slaughtererAdd = require('./slaughtererAdd') //add product**
const slaughtererSend = require('./slaughtererSend') //add product**
const addBatch = require('./addBatch') // add batch
const slaughtererDash =  require('./slaughtererDash') // get data batch to slaughterer
const login = require('./login')
const addUser = require('./addUser')
const retailer = require('./retailer')

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
app.use("/",batch);
app.use("/", addBatch)


app.use("/", farmerAdd);
app.use("/", farmerAddBatch);
app.use("/", slaughtererAdd );
app.use("/", slaughtererSend );
app.use("/", slaughtererDash );
app.use("/", login);
app.use("/", addUser);
app.use("/", retailer)

const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
