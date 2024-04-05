import { DataGrid } from '@mui/x-data-grid';
import "../retailer/retailerDash.css"
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbarConsumer";
import { auto } from '@popperjs/core';
import { useParams } from "react-router-dom";

// Assume the existing imports and component structure

const Consumer = () => {
    const [rows, setRows] = useState([]);

    const { shipmentID } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/consumer/${shipmentID}`);
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [shipmentID]);

    const blockStyle = {
        height: '25%', 
        width: '100%', 
        backgroundColor: 'white', 
        borderRadius: '15px', 
        padding: '20px',
        marginBottom: '10px'
    }

    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerRetailer">
                    <div className="reatailer-info">
                        <h2>Pig Journey</h2>
                        {rows.map(row => (
                            <div key={row.shipmentID}>
                                <h3>Shipment ID: {row.shipmentID}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div style={blockStyle}>
                        {rows.map(row => (
                            <div key={row.shipmentID}>
                                <h3>Farm</h3>
                                <p>Farm: {row.farmName}</p>
                                <p>Location: {row.farmLocation}</p>
                                <p>Batch ID: {row.batchID}</p>
                                <p>Start-date: {row.pigStartDate}</p>
                                <p>End-date: {row.pigEndDate}</p>
                            </div>
                        ))}
                    </div>
                    <div style={blockStyle}>
                        {rows.map(row => (
                            <div key={row.shipmentID}>
                                <h3>Slaughter house</h3>
                                <p>Slaughter house: {row.source}</p>
                                <p>Location: {row.slaughterLocation}</p>
                                <p>Product ID: {row.productID}</p>
                                <p>Product: {row.productName}</p>
                                <p>Proceed-date: {row.productDate}</p>
                                <p>shipment-date: {row.sendDate}</p>
                            </div>
                        ))}
                    </div>
                    <div style={blockStyle}>
                        {rows.map(row => (
                            <div key={row.shipmentID}>
                                <h3>Retail</h3>
                                <p>Retail: {row.retailName}</p>
                                <p>Location: {row.retailLocation}</p>
                                <p>Received-date: {row.estimateArrivalDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Consumer;

