import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbarFarmer";
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, MenuItem, Select } from '@mui/material'; // Import Select and MenuItem
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
          params.value === null ? ( // Check if slaughtererID is null
            <FormControl style={{ minWidth: 120 }}>
              <Select
                value={params.value || ''} // Use params.value directly
                onChange={(event) => handleSlaughtererChange(event, params.row.batchID)}
                displayEmpty
                disabled={params.row.slaughtererID !== null} // Disable the dropdown if slaughtererID is not null
              >
                <MenuItem value="" disabled>
                  Select Slaughterer
                </MenuItem>
                <MenuItem value={'Slaughterer01'}>Slaughterer01</MenuItem>
                <MenuItem value={'Slaughterer02'}>Slaughterer02</MenuItem>
                <MenuItem value={'Slaughterer03'}>Slaughterer03</MenuItem>
                {/* Add more slaughterer options here */}
              </Select>
            </FormControl>
          ) : (
            // If slaughtererID is not null, display it as plain text
            <span>{params.value}</span>
          )
        ),
      },
    ];
  
    const [rows, setRows] = useState([]);
    const [selectedSlaughterers, setSelectedSlaughterers] = useState({}); // State to store selected slaughterers
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/batchInfo');
          setRows(response.data); 
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };
    
      fetchData();
    }, []);
  
    const handleSlaughtererChange = (event, batchID) => {
      const updatedRows = rows.map(row =>
        row.batchID === batchID ? { ...row, slaughtererID: event.target.value } : row
      );
      setRows(updatedRows);
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
