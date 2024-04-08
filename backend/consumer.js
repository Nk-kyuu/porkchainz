const express = require("express");
const db = require("./database");
const consumer = express();

// Middleware to parse request body as JSON
consumer.use(express.json());

consumer.get('/consumer/:shipmentID', async (req, res) => {
    const shipmentID = req.params.shipmentID;

    try {
        const sql = `
        SELECT 
        MAX(f.farmerFirstName) AS farmerFirstName, 
        MAX(f.farmerLastName) AS farmerLastName, 
        MAX(f.farmName) AS farmName, 
        MAX(f.farmLocation) AS farmLocation,
        MAX(s.slaughtererFirstName) AS slaughtererFirstName, 
        MAX(s.slaughtererLastName) AS slaughtererLastName, 
        MAX(s.slaughterName) AS slaughterName, 
        MAX(s.slaughterLocation) AS slaughterLocation,
        MAX(r.retailerFirstName) AS retailerFirstName, 
        MAX(r.retailerLastName) AS retailerLastName, 
        MAX(r.retailName) AS retailName, 
        MAX(r.retailLocation) AS retailLocation,
        DATE_FORMAT(MAX(pi.pigDate), '%Y-%m-%d') AS pigDate,
        MAX(b.batchID) AS batchID,
        MAX(p.productID) AS productID,
        MAX(p.productName) AS productName, 
        MAX(p.productWeight) AS productWeight, 
        MAX(p.productDate) AS productDate,
        DATE_FORMAT(MAX(p.productDate), '%Y-%m-%d') AS productDate,
        MAX(p.productStatus) AS productStatus,
        sh.shipmentID, 
        sh.source, 
        sh.destination, 
        DATE_FORMAT(sh.sendDate, '%Y-%m-%d') AS sendDate,
    DATE_FORMAT(sh.estimateArrivalDate, '%Y-%m-%d') AS estimateArrivalDate,
        sh.shipmentStatus
    FROM shipment sh
    LEFT JOIN product p ON p.shipmentID = sh.shipmentID
    LEFT JOIN retailer r ON sh.destination = r.retailerID
    LEFT JOIN batch b ON p.batchID = b.batchID
    LEFT JOIN slaughterer s ON b.slaughtererID = s.slaughtererID
    LEFT JOIN pig pi ON b.batchID = pi.batchID
    LEFT JOIN farmer f ON pi.farmerID = f.farmerID
    WHERE sh.shipmentID = ?
    GROUP BY sh.shipmentID;
    
        `;

        db.query(sql, [shipmentID], (err, shipmentDetails) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json(shipmentDetails);
            }
        })

    } catch (error) {
        console.error('Error fetching shipment details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = consumer;
