import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbarFarmer";
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, MenuItem, Select } from '@mui/material';
import "../farmer/farmerBatch.css";
import axios from 'axios';

function FarmerDashBatch() {
    const columns = [
        { field: 'batchID', headerName: 'batchID', width: 140 },
        { field: 'batchName', headerName: 'batchName', width: 150 },
        { field: 'batchWeight', headerName: 'batchWeight', width: 150 },
        { field: 'batchDescription', headerName: 'batchDescription', width: 150 },
        {
            field: 'slaughtererID',
            headerName: 'slaughtererID',
            width: 150,
            renderCell: (params) => (
                params.value === null ? (
                    <FormControl style={{ minWidth: 120 }}>
                        <Select
                            value={params.value || ''}
                            onChange={(event) => handleSlaughtererChange(event, params.row.batchID)}
                            displayEmpty
                            disabled={params.row.slaughtererID !== null} // Disable if slaughtererID already selected
                        >
                            <MenuItem value="" disabled>
                                Select Slaughterer
                            </MenuItem>
                            {slaughterers.map(slaughterer => (
                                <MenuItem key={slaughterer.slaughtererID} value={slaughterer.slaughtererID}>
                                    {slaughterer.slaughtererID}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <span>{params.value}</span>
                )
            ),
        },
    ];

    const [rows, setRows] = useState([]);
    const [slaughterers, setSlaughterers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/batchInfo');
                setRows(response.data.batch);
                setSlaughterers(response.data.slaughterer);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const handleSlaughtererChange = async (event, batchID) => {
        try {
            // Update the database with axios
            await axios.put(`http://localhost:5000/updateBatch/${batchID}`, { slaughtererID: parseInt(event.target.value) });
            
            // Update the rows state
            const updatedRows = rows.map(row => {
                if (row.batchID === batchID) {
                    return { ...row, slaughtererID: parseInt(event.target.value) };
                }
                return row;
            });
    
            // Update the rows state
            setRows(updatedRows);
        } catch (error) {
            console.error('Error updating batch:', error);
        }
    };

    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerBatch">
                    <div className="batch-info">
                        <p>Batch Information</p>
                    </div>
                </div>
                <div className="batch-table">
                    <div style={{ height: 370, width: '100%', backgroundColor: 'white' }}>
                        <DataGrid
                            rows={rows}
                            getRowId={(row) => row.batchID}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FarmerDashBatch;
