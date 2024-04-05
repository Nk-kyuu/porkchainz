const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Add = express();


Add.post('/api/slaughtererAdd',jsonParser , (req, res) => {
  const { productName, productWeight, productDate, batchID, slaughtererID } = req.body;
  const sql = 'INSERT INTO product (productName, productWeight, productDate, batchID, slaughtererID) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [productName, productWeight, productDate, batchID, slaughtererID], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ success: false, message: 'Failed to add product' });
    } else {
      console.log('Product added successfully');
      res.status(200).json({ success: true, message: 'Product added successfully', slaughtererID: slaughtererID });
    }
  });
});

module.exports = Add;