import Navbar from "../../components/navbarFarmer";
import { useState, useEffect } from 'react';
import "../farmer/farmerDashPig.css";
import { Button } from "@mui/material";
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
  Checkbox,
  TablePagination
} from '@mui/material';



function FarmerDashPig() {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
          console.error('Farmer ID not found ');
          return;
        }
        const response = await axios.post('http://localhost:5000/pigInfo', { userID });
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
      selectedRowIds.add(row.pigID);
    } else {
      selectedRowIds.delete(row.pigID);
    }
    setSelectedRows(Array.from(selectedRowIds));
    const selectedRowsData = rows.filter(row => selectedRowIds.has(row.pigID))
      .map(row => ({ pigID: row.pigID, pigWeight: row.pigWeight }));
    localStorage.setItem('selectedRowsData', JSON.stringify(selectedRowsData));
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
            <p>Pig Information</p>
          </div>
          <div className="btn-addPig">
            <Button href="/farmerAdd" color="warning" variant="contained">Add Pig</Button>
          </div>
        </div>
        <div className="pig-table" style={{ fontSize: "13.5px", width: "80%",backgroundColor: "white" ,height:"300px" }}>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: "700px"  }}>
              <TableHead>
                <TableRow>
                  <TableCell >Select</TableCell>
                  <TableCell >pigID</TableCell>
                  <TableCell >pigWeight(kg)</TableCell>
                  <TableCell >pigStartDate</TableCell>
                  <TableCell >pigEndDate</TableCell>
                  <TableCell >pigBreed</TableCell>
                  <TableCell >pigHealth</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.pigID}>
                    <TableCell style={{ padding: '5px' }}>
                      <Checkbox
                        checked={selectedRows.includes(row.pigID)}
                        onChange={(event) => handleRowCheckboxChange(event, row)}
                      />
                    </TableCell>
                    <TableCell >{row.pigID}</TableCell>
                    <TableCell >{row.pigWeight}</TableCell>
                    <TableCell >{new Date(row.pigStartDate).toISOString().split('T')[0]}</TableCell>
                    <TableCell >{new Date(row.pigEndDate).toISOString().split('T')[0]}</TableCell>
                    <TableCell >{row.pigBreed}</TableCell>
                    <TableCell >{row.pigHealth}</TableCell>
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
            sx={{marginTop:"20px"}}
          />
        <div className="btn-addBatch">
          {selectedRows.length > 0 && (
            <Link
              to={{
                pathname: "/farmerAddBatch",
                state: { selectedRows: selectedRows }
              }}
            >
              <Button variant="contained" color="error">
                Add Batch
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerDashPig;


// href={"/farmerAddBatch" }
