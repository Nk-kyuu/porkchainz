import Navbar from "../../components/navbarRetailer"
import { DataGrid } from '@mui/x-data-grid';
import "../retailer/retailerDash.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@mui/material';

function RetailerDash() {
    const retailerID = localStorage.getItem("userID");
    const columns = [
        { field: 'shipmentID', headerName: 'Shipment ID', width: 120 },
        { field: 'source', headerName: 'Source', width: 120 },
        { field: 'retailName', headerName: 'Destination', width: 140 },
        { field: 'sendDate', headerName: 'Send Date', width: 120 },
        { field: 'estimateArrivalDate', headerName: 'Est. Arrival Date', width: 160 },
        { field: 'action', headerName: 'Action', width: 120, renderCell: (params) => {
            const handleReceive = async () => {
                try {
                    const updatedStatus = params.row.shipmentStatus === 1 ? 0 : 1;
                    await axios.put(`http://localhost:5000/retailer/updateShipmentStatus/${params.row.shipmentID}`, { status: updatedStatus });
                    params.row.shipmentStatus = updatedStatus; // Update the status in UI
                    setRows([...rows]); // Trigger re-render to update UI
                } catch (error) {
                    console.error('Error updating shipment status:', error);
                }
            };

            return (
                <Button variant="contained" onClick={handleReceive} disabled={params.row.shipmentStatus === 1}>{params.row.shipmentStatus === 1 ? 'Received' : 'Receive'}</Button>
            );
        } },
    ];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/retailer/getShipment/${retailerID}`); // Pass retailerID as URL parameter
                setRows(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [retailerID]); // Add retailerID as a dependency for useEffect

    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerRetailer">
                    <div className="reatailer-info">
                        <p>Shipment Information</p>
                    </div>
                </div>
                <div>
                    <div style={{ height: 370, width: '100%', backgroundColor: 'white', borderRadius: '15px' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.shipmentID}
                            pageSize={5}
                            pagination
                            sx={{borderRadius: '15px'}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RetailerDash;
