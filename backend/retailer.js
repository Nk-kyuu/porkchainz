const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser')

const retailer = express();
const jsonParser = bodyParser.json();

retailer.get('/retailer/getShipment', (req, res) => {
    db.query(`SELECT shipment.shipmentID, shipment.source, retailer.retailName, shipment.sendDate, 
    shipment.estimateArrivalDate, shipment.shipmentStatus FROM shipment 
    INNER JOIN retailer ON shipment.shipmentID = retailer.retailerID`,
    (err, result) => {
        if(err){
            res.status(500).json({ status: "error", message: "Internal server"})
        }else {
            res.json(result)
        }
    })
})

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