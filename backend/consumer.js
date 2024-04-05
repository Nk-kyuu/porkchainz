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
            f.farmerFirstName, f.farmerLastName, f.farmName, f.farmLocation,
            s.slaughtererFirstName, s.slaughtererLastName, s.slaughterName, s.slaughterLocation,
            r.retailerFirstName, r.retailerLastName, r.retailName, r.retailLocation,
            p.productName, p.productWeight, p.productDate, p.productStatus,
            sh.shipmentID, sh.source, sh.destination, sh.sendDate, sh.estimateArrivalDate, sh.shipmentStatus
            FROM shipment sh
            LEFT JOIN product p ON p.shipmentID = sh.shipmentID
            LEFT JOIN retailer r ON sh.destination = r.retailerID
            LEFT JOIN batch b ON p.batchID = b.batchID
            LEFT JOIN slaughterer s ON b.slaughtererID = s.slaughtererID
            LEFT JOIN pig pi ON b.batchID = pi.batchID
            LEFT JOIN farmer f ON pi.farmerID = f.farmerID
            WHERE sh.shipmentID = ?;
        `;

        db.query(sql, [shipmentID], (err, shipmentDetails) => {
            if(err){
                res.status(500).json({ error: err.message});
            }else{
                res.status(200).json(shipmentDetails);
            }
        })
        
    } catch (error) {
        console.error('Error fetching shipment details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = consumer;
