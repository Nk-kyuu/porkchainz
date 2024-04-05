const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser')

const slaughtererShip = express();
const jsonParser = bodyParser.json();

slaughtererShip.get('/slaughtererShip/getShipment', (req, res) => {
    db.query(`SELECT shipment.shipmentID, shipment.source,  shipment.sendDate, 
    shipment.estimateArrivalDate, shipment.shipmentStatus FROM shipment 
    INNER JOIN product ON shipment.shipmentID = product.slaughtererID`,
    (err, result) => {
        if(err){
            res.status(500).json({ status: "error", message: "Internal server"})
        }else {
            res.json(result)
        }
    })
})

slaughtererShip.put('/slaughterer/updateShipmentStatus/:shipmentID', (req, res) => {
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

module.exports = slaughtererShip;