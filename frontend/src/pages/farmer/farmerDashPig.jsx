import Navbar from "../../components/navbarFarmer";
import { useState, useEffect } from 'react';
import "../farmer/farmerDashPig.css";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import axios from 'axios';

function FarmerDashPig() {
    const columns = [
      { field: 'pigID', headerName: 'pigID', width: 140 },
      { field: 'pigWeight', headerName: 'pigWeight', width: 150 },
      { field: 'pigStartDate', headerName: 'pigStartDate', width: 150 },
      { field: 'pigEndDate', headerName: 'pigEndDate', width: 150 },
      { field: 'pigBreed', headerName: 'pigBreed', width: 150 },
      { field: 'pigHealth', headerName: 'pigHealth', width: 150 },
    ];
  
    const [rows, setRows] = useState([]); 
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/pigInfo');
          setRows(response.data); 
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
          <div className="headerFamer">
            <div className="pig-info">
              <p>Pig Information</p>
            </div>
            <div className="btn-addPig">
              <Button href="/farmerAddPig" variant="contained">Add Pig</Button>
            </div>
          </div>
          <div className="pig-table">
            <div style={{ height: 370, width: '100%', backgroundColor: 'white' }}>
              <DataGrid
                rows={rows}
                getRowId={(row) => row.pigID}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                checkboxSelection
               
              />
            </div>
          </div>
          <div className="btn-addBatch">
            <Button 
              href="/farmerAddBatch"
              variant="contained"
              color="error"
             
            >
              Add Batch
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default FarmerDashPig;
