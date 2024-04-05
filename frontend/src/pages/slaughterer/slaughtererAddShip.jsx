import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from "../../components/navbarSlaghterer";
import axios from 'axios'; // import axios
import "../slaughterer/slaughterer.css";

const columns = [
    { field: 'shipmentID', headerName: 'shipmentID', width: 140 },
    { field: 'source', headerName: 'source', width: 150 },
    { field: 'retailName', headerName: 'destination', width: 150, },
    { field: 'sendDate', headerName: 'sendDate', width: 150, },
    { field: 'estimateArrivalDate', headerName: 'estimateArrivalDate', width: 150, },
    { field: 'status', headerName: 'status', width: 150, },
];

function slaughtererAddShip() {
    const userID = localStorage.getItem("userID");
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/slaughtererShip/getShipment/${userID}`); // Pass retailerID as URL parameter
                if (!response.data) {
                    throw new Error("No data received from the server");
                }
                setRows(response.data.shipments);
                const slaughtererID = response.data.slaughtererID;
                localStorage.setItem('slaughtererID', slaughtererID);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [userID]);

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
                            getRowId={(row) => row.shipmentID}
                            pageSize={5}
                            pagination
                            sx={{borderRadius: '15px'}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default slaughtererAddShip