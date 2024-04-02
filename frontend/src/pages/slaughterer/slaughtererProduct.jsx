import Navbar from "../../components/navbarSlaghterer"
import { DataGrid } from '@mui/x-data-grid';
import "../slaughterer/slaughterer.css"
import { Button } from "@mui/material";

const columns = [
    { field: 'productID', headerName: 'productID', width: 140 },
    { field: 'batchGroup', headerName: 'batchGroup', width: 150 },
    { field: 'weight', headerName: 'weight', width: 150, },
    { field: 'date', headerName: 'date', width: 150, },
    { field: 'status', headerName: 'status', width: 150, },
];

const rows = [
    { id: 1, productID: 1, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 2, productID: 2, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 3, productID: 3, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 4, productID: 4, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 5, productID: 6, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 6, productID: 7, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 7, productID: 8, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 8, productID: 9, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
    { id: 9, productID: 10, batchGroup: 'A', weight: '130', date: '10/02/24', status: 'sent' },
];
function slaughtererProduct() {
    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerProduct">
                    <div className="product-info">
                        <p>Product Information</p>
                    </div>
                </div>
                <div >
                    <div style={{ height: 370, width: '100%', backgroundColor:'white' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </div>
                <div className="btn-addShip">
                <Button href="/farmerAddBatch" variant="contained" color="error">Add Shipment</Button>
                </div>

            </div>



        </div>
    )
}

export default slaughtererProduct