const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const slaughtererAdd = express();

slaughtererAdd.use(express.json());

slaughtererAdd.get('/slaughterer', (req,res) => {
  res.send("hello slaughterer");
});

// // API endpoint สำหรับการเพิ่มข้อมูลหมู
// slaughtererAdd.post('/api/slaughtererAdd', (req, res) => {
//   const { productName,productWeight,productDate } = req.body;

//   // Query เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
//   const sql = 'INSERT INTO product ( productName,productWeight,productDate) VALUES (?, ?, ?)';
//   db.query(sql, [productName,productWeight,productDate], (err, result) => {
//     if (err) {
//       console.error('Error adding product:', err);
//       res.status(500).json({ success: false, message: 'Failed to add product' });
//     } else {
//       console.log('Product added successfully');
//       res.status(200).json({ success: true, message: 'Product added successfully' });
//     }
//   });
// });

///////////////////////////////////////////////////////////
// API endpoint สำหรับการเพิ่มข้อมูลหมู
slaughtererAdd.post('/api/slaughtererAdd', (req, res) => {
  const { productName, productWeight, productDate, batchID } = req.body;

  // Query เพื่อดึงข้อมูล batchID จากตาราง batch โดยใช้ batchName
  const getBatchIDSql = 'SELECT batchID FROM batch WHERE batchID = ?';
  db.query(getBatchIDSql, [batchID], (batchErr, batchResult) => {
    if (batchErr) {
      console.error('Error fetching batch ID:', batchErr);
      res.status(500).json({ success: false, message: 'Failed to fetch batch ID' });
      return;
    }
    if (batchResult.length === 0) {
      res.status(404).json({ success: false, message: 'Batch not found' });
      return;
    }

    const batchID = batchResult[0].batchID;

    // Query เพื่อเพิ่มข้อมูลลงในฐานข้อมูล product
    const insertProductSql = 'INSERT INTO product (productName, productWeight, productDate, batchID) VALUES (?, ?, ?, ?)';
    db.query(insertProductSql, [productName, productWeight, productDate, batchID], (err, result) => {
      if (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ success: false, message: 'Failed to add product' });
      } else {
        console.log('Product added successfully');
        res.status(200).json({ success: true, message: 'Product added successfully' });
      }
    });
  });
});


module.exports = slaughtererAdd;