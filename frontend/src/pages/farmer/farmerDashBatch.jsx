import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, MenuItem, Button } from '@mui/material';

const FarmerDashBatch = () => {
    const [sendToAnchor, setSendToAnchor] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([
        { batchID: 'P0000001', group: 'A', weight: '100kg', breed: 'LargeWhite', sendTo: 'Slaughterer01' },
        { batchID: 'P0000002', group: 'B', weight: '120kg', breed: 'DorocJerse', sendTo: 'Slaughterer01' },
        { batchID: 'P0000003', group: 'C', weight: '110kg', breed: 'Landrace', sendTo: 'Slaughterer01' },
    ]);

    const handleSendToClick = (event, index) => {
        setSendToAnchor(event.currentTarget);
        setSelectedRow(index);
    };

    const handleSendToItemClick = (sendTo) => {
        const updatedData = [...data];
        updatedData[selectedRow].sendTo = sendTo;
        setData(updatedData);
        setSendToAnchor(null);
        setSelectedRow(null);
    };

    const handleSendToClose = () => {
        setSendToAnchor(null);
        setSelectedRow(null);
    };

    

    return (
        <div style={{ textAlign: 'left', fontSize: '18px' }}>
            Batch Information
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>batch ID</TableCell>
                            <TableCell>group</TableCell>
                            <TableCell>weight</TableCell>
                            <TableCell>breed</TableCell>
                            <TableCell>send to</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.batchID}>
                                <TableCell>{row.batchID}</TableCell>
                                <TableCell>{row.group}</TableCell>
                                <TableCell>{row.weight}</TableCell>
                                <TableCell>{row.breed}</TableCell>
                                <TableCell>
                                    <Button onClick={(event) => handleSendToClick(event, index)}>{row.sendTo}</Button>
                                    <Menu
                                        anchorEl={sendToAnchor}
                                        open={Boolean(sendToAnchor && selectedRow === index)}
                                        onClose={handleSendToClose}
                                    >
                                        <MenuItem onClick={() => handleSendToItemClick('Slaughterer01')}>Slaughterer01</MenuItem>
                                        <MenuItem onClick={() => handleSendToItemClick('Slaughterer02')}>Slaughterer02</MenuItem>
                                        <MenuItem onClick={() => handleSendToItemClick('Slaughterer03')}>Slaughterer03</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>
    );
}

export default FarmerDashBatch;
