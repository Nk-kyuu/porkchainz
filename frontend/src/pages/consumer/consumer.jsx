import { DataGrid } from '@mui/x-data-grid';
import "../retailer/retailerDash.css"
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbarConsumer";

// Assume the existing imports and component structure

const Consumer = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/consumer/2');
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

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
                    <div style={{ height: 300, width: '100%', backgroundColor: 'white', borderRadius: '15px' }}>
                        {rows.map(row => (
                            <div key={row.shipmentID}>
                                <h3>Farmer</h3>
                                <p>Source: {row.source}</p>
                                <p>Destination: {row.retailName}</p>
                                <p>Send Date: {row.sendDate}</p>
                                <p>Estimated Arrival Date: {row.estimateArrivalDate}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ height: 300, width: '100%', backgroundColor: 'white', borderRadius: '15px' }}>
                        {rows.map(row => (
                            <div key={row.shipmentID}>
                                <h3>Slaughter house</h3>
                                <p>Source: {row.source}</p>
                                <p>Destination: {row.retailName}</p>
                                <p>Send Date: {row.sendDate}</p>
                                <p>Estimated Arrival Date: {row.estimateArrivalDate}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ height: 300, width: '100%', backgroundColor: 'white', borderRadius: '15px' }}>
                        {rows.map(row => (
                            <div key={row.shipmentID}>
                                <h3>Retailer</h3>
                                <p>Source: {row.source}</p>
                                <p>Destination: {row.retailName}</p>
                                <p>Send Date: {row.sendDate}</p>
                                <p>Estimated Arrival Date: {row.estimateArrivalDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Consumer;

