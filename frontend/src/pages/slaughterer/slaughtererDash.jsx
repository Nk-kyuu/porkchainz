import Navbar from "../../components/navbarSlaghterer"
import { DataGrid } from '@mui/x-data-grid';
import "../slaughterer/slaughterer.css"
import { Button } from "@mui/material";

const columns = [
    { field: 'batchID', headerName: 'batchID', width: 140 },
    { field: 'batchName', headerName: 'group', width: 150 },
    { field: 'quantity', headerName: 'quantity', width: 150 },
    { field: 'weight',headerName: 'weight',width: 150,},
    { field: 'description',headerName: 'description',width: 150,},
    { field: 'farmName',headerName: 'farmName',width: 150,},
    ];

const rows = [
    { id: 1, batchID: 1, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti'},
    { id: 2, batchID: 2, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti' },
    { id: 3, batchID: 3, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti' },
    { id: 4, batchID: 4, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti' },
    { id: 5, batchID: 6, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti' },
    { id: 6, batchID: 7, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti' },
    { id: 7, batchID: 8, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti' },
    { id: 8, batchID: 9, batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti'},
    { id: 9, batchID: 10,batchName:'A', quantity: '3', weight: '130',description: '-' ,farmName: 'Chonti'},
];
function slaughtererDash() {
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
                    <div className="btn-addProduct">
                    <Button href="/slaughtererAddProduct" variant="contained">Add Product</Button>
                    </div>
                </div>
                <div>
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
            </div>
        </div>
    )
}


export default slaughtererDash