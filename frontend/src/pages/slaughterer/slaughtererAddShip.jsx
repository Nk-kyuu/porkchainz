import Navbar from "../../components/navbarSlaghterer"
import { DataGrid } from '@mui/x-data-grid';
import "../slaughterer/slaughterer.css"
const columns = [
    { field: 'shippmentID', headerName: 'shippmentID', width: 140 },
    { field: 'productID', headerName: 'productID', width: 150 },
    { field: 'source', headerName: 'source', width: 150 },
    { field: 'destination', headerName: 'destination', width: 150, },
    { field: 'sendDate', headerName: 'sendDate', width: 150, },
    { field: 'estimateArrivalDate', headerName: 'estimateArrivalDate', width: 150, },
    { field: 'status', headerName: 'status', width: 150, },
];


const rows = [
    { id: 1, shippmentID: 1, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 2, shippmentID: 2, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 3, shippmentID: 3, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 4, shippmentID: 4, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 5, shippmentID: 5, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 6, shippmentID: 6, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 7, shippmentID: 7, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 8, shippmentID: 8, productID: 'A', source: '3', destination: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
    { id: 9, shippmentID: 9, productID: 'A', source: '3', destinationt: '130', sendDate: '-', estimateArrivalDate: 'Chonti', status: 'sent' },
];
function slaughtererAddShip() {
    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerShipment">
                    <div className="shipment-info">
                        <p>Shippment  Information</p>
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
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default slaughtererAddShip