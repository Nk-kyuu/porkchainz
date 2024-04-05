const express = require('express');
const db = require('./database');

const slaughtererShip = express();

slaughtererShip.get('/api/getShipment', (req, res) => {
    db.query(`SELECT * FROM shipment`, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(result);
        }
    });
});

module.exports = slaughtererShip;
