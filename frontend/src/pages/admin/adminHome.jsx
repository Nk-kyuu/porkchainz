import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Navbar from "../../components/navbarAdmin";
import { useState, useEffect } from 'react';
import "../farmer/farmerDashPig.css";
import axios from 'axios';

const adminHome = () => {
    const columns = [
    { field: 'ID', headerName: 'ID', width: 60 },
    { field: 'role', headerName: 'role', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'name', headerName: 'Company Name', width: 150 },
    { field: 'location', headerName: 'Location', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 120 },
];


    const [rows, setRows] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getUser');
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
                        <p>User Information</p>
                    </div>
                    <div className="btn-addPig">
                        <Button href="/admin/adduser" variant="contained" color='warning'>Add User</Button>
                    </div>
                </div>
                <div className="pig-table">
                    <div style={{ height: 370, width: '100%', backgroundColor: 'white' }}>
                        <DataGrid
                            rows={rows}
                            getRowId={(row) => row.userID}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10]}
                            checkboxSelection

                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default adminHome