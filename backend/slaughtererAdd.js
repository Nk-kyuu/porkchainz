const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js

const slaughtererAdd = express();

slaughtererAdd.use(express.json());

// API endpoint สำหรับการเพิ่มข้อมูลหมู
slaughtererAdd.post('/api/slaughtererAdd', (req, res) => {
  const { productName,productWeight,productDate } = req.body;

  // Query เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
  const sql = 'INSERT INTO product ( productName,productWeight,productDate) VALUES (?, ?, ?)';
  db.query(sql, [productName,productWeight,productDate], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ success: false, message: 'Failed to add product' });
    } else {
      console.log('Product added successfully');
      res.status(200).json({ success: true, message: 'Product added successfully' });
    }
  });
});

module.exports = slaughtererAdd;