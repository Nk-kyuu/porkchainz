// slaughtererDash.js
import Navbar from "../../components/navbarSlaghterer";
import "../slaughterer/slaughterer.css";
import { Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
                const response = await axios.get('http://localhost:5000/getInfo');
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
                        <Button href="/slaughtererAdd" color="warning" variant="contained">Add Product</Button>
                    </div>
                </div>
                <div className="pig-table" style={{ fontSize: "13.5px", width: "80%" }}>
                    <TableContainer component={Paper}>
                        <Table style={{ minWidth: "700px" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>batchID</TableCell>
                                    <TableCell>batchName</TableCell>
                                    <TableCell>batchQuantity</TableCell>
                                    <TableCell>batchWeight</TableCell>
                                    <TableCell>batchDescription</TableCell>
                                    <TableCell>farmName</TableCell> {/* เพิ่มคอลัมน์ farmName ที่นี่ */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.pigID}>
                                        <TableCell>{row.batchID}</TableCell>
                                        <TableCell>{row.batchName}</TableCell>
                                        <TableCell>{row.batchQuantity}</TableCell>
                                        <TableCell>{row.batchWeight}</TableCell>
                                        <TableCell>{row.batchDescription}</TableCell>
                                        <TableCell>{row.farmName}</TableCell> {/* เพิ่มคอลัมน์ farmName ที่นี่ */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                <div className="btn-addBatch">
                    {/* ส่วนของปุ่มเพิ่ม Batch */}
                </div>
            </div>
        </div>
    );
}

export default SlaughtererDash;
