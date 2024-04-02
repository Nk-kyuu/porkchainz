const express = require("express");
const db = require("./database");
const pig = express();

pig.get('/pigInfo', (req,res)=>{
    db.query("SELECT * FROM pig",(err, result)=>{
        if(err){

        }else{
            res.json(result);
        }
    })
  });
  

module.exports = pig;