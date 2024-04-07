// slaughtererDash.js
import Navbar from "../../components/navbarSlaghterer";
import "../slaughterer/slaughterer.css";
import { Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination
} from '@mui/material';

function SlaughtererDash() {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const userID= localStorage.getItem('userID');
            if (!userID) {
              console.error('slaughterer ID not found ');
              return;
            }
            const response = await axios.post('http://localhost:5000/getInfo', { userID });
            setRows(response.data); 
          } catch (err) {
            console.error('Error fetching data:', err);
          }
        };
        fetchData();
      }, []);
      
      







    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <div className="headerFamer">
                    <div className="pig-info">
                        <p>Batch Information</p>
                    </div>
                    <div className="btn-addPig">
                        <Button href="/AddProduct" color="warning" variant="contained">Add Product</Button>
                    </div>
                </div>
                <div className="pig-table" style={{ fontSize: "13.5px",  width: "80%",backgroundColor: "white" ,height:"300px" }}>
                    <TableContainer component={Paper}>
                        <Table style={{ minWidth: "700px" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>batchID</TableCell>
                                    <TableCell>batchName</TableCell>
                                    <TableCell>batchQuantity</TableCell>
                                    <TableCell>batchWeight</TableCell>
                                    <TableCell>batchDescription</TableCell>
                                    <TableCell>farmName</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.batchID}>
                                        <TableCell>{row.batchID}</TableCell>
                                        <TableCell>{row.batchName}</TableCell>
                                        <TableCell>{row.batchQuantity}</TableCell>
                                        <TableCell>{row.batchWeight}</TableCell>
                                        <TableCell>{row.batchDescription}</TableCell>
                                        <TableCell>{row.farmName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </div>
        </div>
    );
}

export default SlaughtererDash;