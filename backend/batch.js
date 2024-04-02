const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const batch = express();

batch.get('/batch', (req,res) => {
    res.send("hello batch");
});

module.exports = batch;