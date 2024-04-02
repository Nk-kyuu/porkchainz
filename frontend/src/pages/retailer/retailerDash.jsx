import Navbar from "../../components/navbarRetailer"
import { DataGrid } from '@mui/x-data-grid';
import "../retailer/retailerDash.css"

const columns = [
    { field: 'shippmentID', headerName: 'shippmentID', width: 140 },
    { field: 'productID', headerName: 'productID', width: 150 },
    { field: 'farmName', headerName: 'source', width: 150 },
    { field: 'slaughtererName', headerName: 'destination', width: 150, },
    { field: 'sendDate', headerName: 'sendDate', width: 150, },
    { field: 'estimateArrivalDate', headerName: 'estimateArrivalDate', width: 150, },
    { field: 'status', headerName: 'status', width: 150, },
];

const rows = [
    { id: 1, shippmentID: 1, productID: '1', farmName: 'Choti', slaughtererName: 'Nathakarn', sendDate: '10/02/24', estimateArrivalDate: '11/02/24', status: 'recive' },
    { id: 2, shippmentID: 2, productID: '1', farmName: 'Choti', slaughtererName: 'Nathakarn', sendDate: '10/02/24', estimateArrivalDate: '11/02/24', status: 'recive' },
    { id: 3, shippmentID: 3, productID: '1', farmName: 'Choti', slaughtererName: 'Nathakarn', sendDate: '10/02/24', estimateArrivalDate: '11/02/24', status: 'recive' },
    { id: 4, shippmentID: 4, productID: '1', farmName: 'Choti', slaughtererName: 'Nathakarn', sendDate: '10/02/24', estimateArrivalDate: '11/02/24', status: 'recive' },
    { id: 5, shippmentID: 5, productID: '1', farmName: 'Choti', slaughtererName: 'Nathakarn', sendDate: '10/02/24', estimateArrivalDate: '11/02/24', status: 'recive' },
]
function retailerDash() {
    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerRetailer">
                    <div className="reatailer-info">
                        <p>Shipment  Information</p>
                    </div>
                </div>
                <div >
                    <div style={{ height: 370, width: '100%', backgroundColor:'white'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default retailerDash