import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from "../../components/navbarSlaghterer";
import "../slaughterer/slaughterer.css";

const columns = [
    { field: 'shipmentID', headerName: 'shipmentID', width: 140 },
    { field: 'source', headerName: 'source', width: 150 },
    { field: 'destination', headerName: 'destination', width: 150, },
    { field: 'sendDate', headerName: 'sendDate', width: 150, },
    { field: 'estimateArrivalDate', headerName: 'estimateArrivalDate', width: 150, },
    { field: 'status', headerName: 'status', width: 150, },
];

function slaughtererAddShip() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('/api/getShipment')
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerShipment">
                    <div className="shipment-info">
                        <p>Shipment Information</p>
                    </div>
                </div>
                <div>
                    <div style={{ height: 370, width: '100%', backgroundColor: 'white' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default slaughtererAddShip;
