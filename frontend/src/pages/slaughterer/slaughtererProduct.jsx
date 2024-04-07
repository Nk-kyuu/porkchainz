import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button, TablePagination } from '@mui/material';
import Navbar from "../../components/navbarSlaghterer"

function SlaughtererProduct() {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
          console.error('User ID not found');
          return;
        }
        const response = await axios.post('http://localhost:5000/productInfo', { userID });
        setRows(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleRowCheckboxChange = (event, row) => {
    const selectedRowIds = new Set(selectedRows);
    if (event.target.checked) {
      selectedRowIds.add(row.productID);
    } else {
      selectedRowIds.delete(row.productID);
    }
    setSelectedRows(Array.from(selectedRowIds));
    const selectedRowsData = rows.filter(row => selectedRowIds.has(row.productID))
      .map(row => ({ productID: row.productID }));
    localStorage.setItem('productID', JSON.stringify(selectedRowsData));
  };

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
            <p>Product Information</p>
          </div>
        </div>
        <div className="pig-table" style={{ fontSize: "13.5px", width: "80%", backgroundColor: "white", height: "340px" }}>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: "700px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>productID</TableCell>
                  <TableCell>productName</TableCell>
                  <TableCell>productWeight</TableCell>
                  <TableCell>productDate</TableCell>
                  <TableCell>productStatus</TableCell>
                  <TableCell>productHash</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.productID}>
                    <TableCell style={{ padding: '5px' }}>
                      <Checkbox
                        checked={selectedRows.includes(row.productID)}
                        onChange={(event) => handleRowCheckboxChange(event, row)}
                      />
                    </TableCell>
                    <TableCell>{row.productID}</TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.productWeight}</TableCell>
                    <TableCell>{row.productDate}</TableCell>
                    <TableCell>{row.productStatus}</TableCell>
                    <TableCell>{row.productHash}</TableCell>
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
          sx={{ marginTop: "20px" }}
        />
        <div className="btn-addBatch">
          {selectedRows.length > 0 && (
            <Link
              to={{
                pathname: "/slaughtererSend",
                state: { selectedRows: selectedRows }
              }}
            >
              <Button variant="contained" color="error">
                Add Shipment
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SlaughtererProduct;