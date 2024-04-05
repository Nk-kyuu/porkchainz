// slaughtererApi.js
const express = require("express");
const db = require("./database");
const getBash = express();

getBash.get('/getInfo', (req,res)=>{
    db.query("SELECT batch.*, pig.FarmerID, farmer.farmName FROM batch INNER JOIN pig ON batch.batchID = pig.batchID INNER JOIN farmer ON pig.FarmerID = farmer.FarmerID ORDER BY batch.batchID ASC",(err, result)=>{
        if(err){
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(result);
        }
    })
});

module.exports = getBash;
