const express = require("express");
const db = require("./database");
const getBash = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();


getBash.post('/getInfo', (req,res)=>{
    const slaughtererID = req.body.slaughtererID; 
    const sql = `
      SELECT batch.batchID, batch.batchName, batch.batchWeight, batch.batchQuantity, batch.batchDescription, farmer.farmName
      FROM batch
      JOIN pig ON pig.batchID = batch.batchID
      JOIN farmer ON pig.farmerID = farmer.farmerID
      WHERE batch.slaughtererID = ?
    `;
    
    db.query(sql, [slaughtererID], (err, result) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(result);
      }
    });
});
getBash.post('/slaughtererID', jsonParser,(req, res) => {
    const email = req.body.email; 

    const findSlaughterer = `
        SELECT slaughtererID
        FROM slaughterer
        INNER JOIN user ON slaughterer.userID = user.userID
        WHERE user.email = ?`;

    db.query( findSlaughterer , [email], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching pig information');
        } else {
            // ตรวจสอบว่ามีผลลัพธ์ที่พบหรือไม่
            if (result.length > 0) {
                // ส่งผลลัพธ์กลับไปเป็น JSON
                res.json({ slaughtererID: result[0].slaughtererID }); // เพิ่มการส่ง farmerID กลับไปในรูปแบบของ JSON
            } else {
                res.status(404).send('No data found for the provided email');
            }
        }
    });
});

module.exports = getBash;

