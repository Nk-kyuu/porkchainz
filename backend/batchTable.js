const express = require("express");
const db = require("./database");
const batch = express();

batch.get('/batchInfo', (req,res)=>{
    db.query("SELECT * FROM batch","SELECT * FROM slaughterer ",(err, result)=>{
        if(err){

        }else{
            res.json(result);
        }
    })
  });
  

module.exports = batch;