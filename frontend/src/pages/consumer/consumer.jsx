import Navbar from "../../components/navbarRetailer"
import { DataGrid } from '@mui/x-data-grid';
import "../retailer/retailerDash.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@mui/material';

// Assume the existing imports and component structure

const Consumer = () => {
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/consumer/1');
                setShipments(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='container'>
            <h2>Pig Journey</h2>
            {shipments.map((shipment) => (
                <div key={shipment.shipmentID}> {/* Add key prop here */}
                    <h3>Shipment ID: {shipment.shipmentID}</h3>
                    <p>Farm: {shipment.farmerFirstName} {shipment.farmerLastName}, {shipment.farmName}, {shipment.farmLocation}</p>
                    <p>Slaughter: {shipment.slaughtererFirstName} {shipment.slaughtererLastName}, {shipment.slaughterName}, {shipment.slaughterLocation}</p>
                    <p>Retail: {shipment.retailerFirstName} {shipment.retailerLastName}, {shipment.retailName}, {shipment.retailLocation}</p>
                    {/* You can include more detailed information here */}
                </div>
            ))}
        </div>
    );
};
export default Consumer;

