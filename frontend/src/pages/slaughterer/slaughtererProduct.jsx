// slaughtererProduct.js
import Navbar from "../../components/navbarSlaghterer";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../slaughterer/slaughterer.css';

const columns = [
    { field: 'productID', headerName: 'Product ID', width: 140 },
    { field: 'productWeight', headerName: 'Product Weight', width: 150 },
    { field: 'productDate', headerName: 'Product Date', width: 150 },
    { field: 'productStatus', headerName: 'Product Status', width: 150 },
];

function SlaughtererProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getProducts');
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerProduct">
                    <div className="product-info">
                        <p>Product Information</p>
                    </div>
                </div>
                <div>
                    <div style={{ height: 370, width: '100%', backgroundColor: 'white' }}>
                        <DataGrid
                            rows={products}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            getRowId={(row) => row.productID} // กำหนดให้ใช้ productID เป็น id ของแถว
                        />
                    </div>
                </div>
                <div className="btn-addShip">
                    <Button href="/slaughtererSend" variant="contained" color="error">Add Shipment</Button>
                </div>
            </div>
        </div>
    );
}

export default SlaughtererProduct;
