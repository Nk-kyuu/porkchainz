const express = require('express');
const db = require('./database');

const slaughtererShip = express();

slaughtererShip.get('/slaughtererShip/getShipment/:userID', (req, res) => {
    const userID = req.params.userID;
    // First, retrieve the slaughtererID based on the userID
    db.query(
        `SELECT slaughtererID FROM slaughterer WHERE userID = ?`,
        [userID],
        (err, result) => {
            if(err) {
                res.status(500).json({ status: "error", message: "Internal server error" });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ status: "error", message: "slaughterer not found" });
                } else {
                    const slaughtererID = result[0].slaughtererID;
                    // Now, use the slaughtererID to fetch the shipment details
                    db.query(
                        `SELECT shipment.shipmentID, shipment.source, retailer.retailName, shipment.sendDate, 
                        shipment.estimateArrivalDate, shipment.shipmentStatus 
                        FROM shipment 
                        INNER JOIN product ON product.productID = shipment.shipmentID
                        INNER JOIN retailer ON shipment.destination = retailer.retailerID
                        WHERE product.slaughtererID = ?`,
                        [slaughtererID],
                        (err, result) => {
                            if(err) {
                                res.status(500).json({ status: "error", message: "Internal server error" });
                            } else {
                                const responseData = {
                                    slaughtererID: slaughtererID,
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

module.exports = slaughtererShip;