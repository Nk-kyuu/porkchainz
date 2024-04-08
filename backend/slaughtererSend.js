const express = require('express');
const db = require('./database'); // เรียกใช้ไฟล์ database.js
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const slaughtererSend = express();

slaughtererSend.use(express.json());

//API endpoint สำหรับการเพิ่มข้อมูลหมู
slaughtererSend.post('/api/slaughtererSend', (req, res) => {
  const { source, destination, sendDate, estimateArrivalDate, slaughtererHash } = req.body;

  // Query เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
  const sql = 'INSERT INTO shipment ( source, destination ,sendDate ,estimateArrivalDate ,slaughtererHash ) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [source, destination, sendDate, estimateArrivalDate, slaughtererHash ], (err, result) => {
    if (err) {
      console.error('Error adding shipment:', err);
      res.status(500).json({ success: false, message: 'Failed to add shipment' });
    } else {
      console.log('shipment added successfully');
      res.status(200).json({ success: true, message: 'shipment added successfully' });
    }

  });
});
//addShip
slaughtererSend.post("/createShip", jsonParser, (req, res) => {
  try {
    const { source, estimateArrivalDate, transactionHash } = req.body;

    // Insert pig data into the database
     db.query(
      'INSERT INTO shipment (source, estimateArrivalDate, shipmentHash) VALUES (?, ?, ?)',
      [source, estimateArrivalDate, transactionHash]
    );

    res.status(201).json({ message: 'Shipment data added successfully' });
  } catch (error) {
    console.error('Error adding shipment data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

//   const source = req.body.source;
//   const destination = req.body.destination;
//   const sendDate = req.body.sendDate;
//   const arriveDate = req.body.estimateArrivalDate;
//   const shipmentStatus = 0;
//   const userID = req.body.userID;
//   const productIDs = req.body.productID; // Assuming productID is an array

//   const slaughtererIDQuery = 'SELECT slaughterer.slaughtererID FROM slaughterer JOIN user ON user.userID = slaughterer.userID WHERE user.userID = ?';

//   db.query(slaughtererIDQuery, [userID], (err, slaughtererIDResult) => {
//     if (err) {
//       console.error('Error fetching slaughtererID:', err);
//       return res.status(500).json({ success: false, message: 'Failed to fetch slaughtererID' });
//     }
//     if (slaughtererIDResult.length === 0) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     const slaughtererID = slaughtererIDResult[0].slaughtererID;

//     db.query(
//       `
//         INSERT INTO shipment (shipmentID, source, destination, sendDate, estimateArrivalDate, shipmentStatus)
//         VALUES (NULL, '${source}', '${destination}', '${sendDate}', '${arriveDate}', '${shipmentStatus}');
//       `,
//       [slaughtererID],
//       function (err, results, fields) {
//         if (err) {
//           res.json({ status: "error", message: err });
//           return;
//         }

//         const shipmentID = results.insertId;

// // Update product table with shipmentID and productStatus for each product in the array
// for (const productID of productIDs) {
//   const updateProductQuery = `
//     UPDATE product
//     SET shipmentID = ${shipmentID}, productStatus = 1
//     WHERE productID = ${productID};
//   `;

//   db.query(updateProductQuery, (updateErr, updateResult) => {
//     if (updateErr) {
//       console.error('Error updating product:', updateErr);
//       // Handle individual product update error (consider logging to a database)
//     }
//   });
// }

// res.json({ success: true, status: "ok" });
//       }  
//     );
//   });
});

//sendRetailer
slaughtererSend.get('/api/retailerID', (req, res) => {
  const query = 'SELECT retailerID FROM retailer';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching retailer names:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch retailer names' });
    }
    // Extract retailer names from the query results
    const retailerIDs = results.map(result => result.retailerID);
    // Send the retailer names as a JSON response
    res.status(200).json({ success: true, retailerIDs});
  });
});

module.exports = slaughtererSend;
