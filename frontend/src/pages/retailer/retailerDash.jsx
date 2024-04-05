import Navbar from "../../components/navbarRetailer";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import QRCode from "qrcode.react";

function RetailerDash() {
    const userID = localStorage.getItem("userID");
    const [rows, setRows] = useState([]);

    const columns = [
        { field: "shipmentID", headerName: "Shipment ID", width: 120 },
        { field: "source", headerName: "Source", width: 120 },
        { field: "retailName", headerName: "Destination", width: 140 },
        { field: "sendDate", headerName: "Send Date", width: 120 },
        {
            field: "estimateArrivalDate",
            headerName: "Est. Arrival Date",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 120,
            renderCell: (params) => {
                const handleReceive = async () => {
                    try {
                        const updatedStatus = params.row.shipmentStatus === 1 ? 0 : 1;
                        await axios.put(
                            `http://localhost:5000/retailer/updateShipmentStatus/${params.row.shipmentID}`,
                            { status: updatedStatus }
                        );
                        params.row.shipmentStatus = updatedStatus; // Update the status in UI
                        setRows([...rows]); // Trigger re-render to update UI
                    } catch (error) {
                        console.error("Error updating shipment status:", error);
                    }
                };

                return (
                    <Button
                        variant="contained"
                        onClick={handleReceive}
                        disabled={params.row.shipmentStatus === 1}
                    >
                        {params.row.shipmentStatus === 1 ? "Received" : "Receive"}
                    </Button>
                );
            },
        },
        {
            field: "qrCode",
            headerName: "QR Code",
            width: 100,
            renderCell: (params) => (
                params.row.shipmentStatus === 1 ? (
                    <QRCode
                        value={`http://localhost:5173/consumer/${params.row.shipmentID}`}
                        size={50}
                    />
                ) : (
                    <span></span>
                )
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/retailer/getShipment/${userID}`
                );
                if (!response.data) {
                    throw new Error("No data received from the server");
                }
                setRows(response.data.shipments);
                const retailerID = response.data.retailerID;
                localStorage.setItem("retailerID", retailerID);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [userID]);

    return (
        <div className="container">
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="content">
                <div className="headerRetailer">
                    <div className="reatailer-info">
                        <p>Shipment Information</p>
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            height: 370,
                            width: "100%",
                            backgroundColor: "white",
                            borderRadius: "15px",
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.shipmentID}
                            pageSize={5}
                            pagination
                            sx={{ borderRadius: "15px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RetailerDash;
