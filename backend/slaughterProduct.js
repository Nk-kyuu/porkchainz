// slaughtererApi.js
const express = require("express");
const db = require("./database");
const slaughtererProduct = express();

slaughtererProduct.get('/getProducts', (req,res)=>{
    db.query("SELECT product.productID, product.productWeight, product.productDate, product.productStatus FROM product",(err, result)=>{
        if(err){
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(result);
        }
    })
});

module.exports = slaughtererProduct;
