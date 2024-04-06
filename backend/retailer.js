const express = require('express');
const db = require('./database');
const retailer = express();

retailer.get('/retailer/getShipment/:userID', (req, res) => {
    const userID = req.params.userID;
    // First, retrieve the retailerID based on the userID
    db.query(
        `SELECT retailerID FROM retailer WHERE userID = ?`,
        [userID],
        (err, result) => {
            if (err) {
                res.status(500).json({ status: "error", message: "Internal server error" });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ status: "error", message: "Retailer not found" });
                } else {
                    const retailerID = result[0].retailerID;
                    // Now, use the retailerID to fetch the shipment details
                    db.query(
                        `SELECT 
                        shipment.shipmentID, 
                        shipment.source, 
                        retailer.retailName, 
                        DATE_FORMAT(shipment.sendDate, '%y-%m-%d') AS sendDate,
                        DATE_FORMAT(shipment.estimateArrivalDate, '%y-%m-%d') AS estimateArrivalDate,
                        shipment.shipmentStatus 
                        FROM shipment 
                        INNER JOIN retailer ON shipment.destination = retailer.retailerID
                        WHERE retailer.retailerID = ? `,
                        [retailerID],
                        (err, result) => {
                            if (err) {
                                res.status(500).json({ status: "error", message: "Internal server error" });
                            } else {
                                const responseData = {
                                    retailerID: retailerID,
                                    shipments: result
                                };
                                res.json(responseData);
                            }
                        }
                    );
                }
            }
        }
    );
});


retailer.put('/retailer/updateShipmentStatus/:shipmentID', (req, res) => {
    const shipmentID = req.params.shipmentID;
    const { status } = req.body;

    db.query(
        'UPDATE shipment SET shipmentStatus = ? WHERE shipmentID = ?',
        [status, shipmentID],
        (err, result) => {
            if (err) {
                console.error('Error updating shipment status:', err);
                res.status(500).json({ status: 'error', message: 'Internal server error' });
            } else {
                res.status(200).json({ status: 'ok', message: 'Shipment status updated successfully' });
            }
        }
    );
});

module.exports = retailer;