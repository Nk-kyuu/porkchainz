const express = require("express");
const db = require("./database");
const getBash = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();


getBash.post('/getInfo',jsonParser , (req, res) => {
  const userID = req.body.userID;
  const slaughtererIDQuery = 'SELECT slaughterer.slaughtererID FROM slaughterer JOIN user ON user.userID = slaughterer.userID WHERE user.userID = ?';
  db.query(slaughtererIDQuery, [userID], (err, slaughtererIDResult) => {
      if (err) {
          console.error('Error fetching slaughtererID:', err);
          return res.status(500).json({ success: false, message: 'Failed to fetch slaughtererID' });
      }
      if (slaughtererIDResult.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      const slaughtererID = slaughtererIDResult[0].slaughtererID;

      const sql = `
      SELECT batch.batchID, batch.batchName, batch.batchWeight, batch.batchQuantity, batch.batchDescription, farmer.farmName
      FROM batch
      JOIN pig ON pig.batchID = batch.batchID
      JOIN farmer ON pig.farmerID = farmer.farmerID
      WHERE batch.slaughtererID = ?
      GROUP BY batch.batchID
      `;

      db.query(sql, [slaughtererID], (err, result) => {
          if (err) {
              console.error('Error fetching data:', err);
              return res.status(500).json({ error: 'Internal server error' });
          }
          res.json(result);
      });
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

