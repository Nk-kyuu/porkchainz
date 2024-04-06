const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const slaughtererSend = express();

slaughtererSend.use(express.json());

slaughtererSend.get('/slaughterer', (req,res) => {
  res.send("hello slaughterer");
});

//API endpoint สำหรับการเพิ่มข้อมูลหมู
slaughtererSend.post('/api/slaughtererSend', (req, res) => {
  const { source, retailerID, sendDate, estimateArrivalDate } = req.body;

  // Query เพื่อดึง retailerID จากตาราง retailer
  const retailerQuery = 'SELECT * FROM retailer WHERE retailerID = ?';
  db.query(retailerQuery, [retailerID], (retailerErr, retailerResult) => {
    if (retailerErr) {
      console.error('Error fetching retailer:', retailerErr);
      res.status(500).json({ success: false, message: 'Failed to fetch retailer' });
      return;
    }
    if (retailerResult.length === 0) {
      res.status(404).json({ success: false, message: 'Retailer not found' });
      return;
    }

    const destination = retailerResult[0].retailerID;

    // Query เพื่อเพิ่มข้อมูลลง shipment
    const sql = 'INSERT INTO shipment (source, destination, sendDate, estimateArrivalDate) VALUES (?, ?, ?, ?)';
    db.query(sql, [source, destination, sendDate, estimateArrivalDate], (err, result) => {
      if (err) {
        console.error('Error adding shipment:', err);
        res.status(500).json({ success: false, message: 'Failed to add shipment' });
      } else {
        console.log('Shipment added successfully');
        res.status(200).json({ success: true, message: 'Shipment added successfully' });
      }
    });
  });
});


module.exports = slaughtererSend;

// // API endpoint สำหรับการดึงข้อมูล shipment ทั้งหมด
// slaughtererSend.get('/api/shipment', (req, res) => {
//   // Query เพื่อดึงข้อมูล shipment ทั้งหมด
//   const sql = 'SELECT * FROM shipment';
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error fetching shipments:', err);
//       res.status(500).json({ success: false, message: 'Failed to fetch shipments' });
//     } else {
//       console.log('Shipments fetched successfully');
//       res.status(200).json({ success: true, message: 'Shipments fetched successfully', shipments: results });
//     }
//   });
// });