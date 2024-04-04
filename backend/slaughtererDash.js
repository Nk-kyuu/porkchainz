const express = require("express");
const db = require("./database");
const getBash = express();

getBash.get('/getInfo', (req,res)=>{
    db.query("SELECT * FROM batch",(err, result)=>{
        if(err){

        }else{
            res.json(result);
        }
    })
  });
  

module.exports = getBash;