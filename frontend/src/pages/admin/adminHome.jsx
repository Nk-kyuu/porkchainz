import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './adminHome.css';

function adminHome() {
    const columns = [
        { field: 'userID', headerName: 'UserID', width: 90 },
        {
            field: 'role',
            headerName: 'Role',
            width: 110,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
            editable: true,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
            editable: true,
        },
        {
            field: 'firstname',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastname',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
        },
    ];

    const rows = [
        { userID: 1, role: 'farmer', address: 'x0065454888', username: 'NK-Kyuu', firstname: 'Ingkamom', lastname: 'Chatree', email: 'namkhing1830@gmail.com', phone: '0950473789' },
        { userID: 2, role: 'farmer', address: 'x0065454888', username: 'NK-Kyuu', firstname: 'Ingkamom', lastname: 'Chatree', email: 'namkhing1830@gmail.com', phone: '0950473789' },
        { userID: 3, role: 'farmer', address: 'x0065454888', username: 'NK-Kyuu', firstname: 'Ingkamom', lastname: 'Chatree', email: 'namkhing1830@gmail.com', phone: '0950473789' },
        { userID: 4, role: 'farmer', address: 'x0065454888', username: 'NK-Kyuu', firstname: 'Ingkamom', lastname: 'Chatree', email: 'namkhing1830@gmail.com', phone: '0950473789' },
        { userID: 5, role: 'farmer', address: 'x0065454888', username: 'NK-Kyuu', firstname: 'Ingkamom', lastname: 'Chatree', email: 'namkhing1830@gmail.com', phone: '0950473789' },
    ]

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <h1 style={{ position: 'absolute', top: 100, left: 300}}>User Information</h1>
            <Button variant='contained' color='warning' href='/admin/adduser' sx={{ position: 'absolute', top: 100, right: 100 }}>Add User</Button>
        <Box sx={{ width: '80%', margin: 'auto', marginLeft: '300px', marginTop: '60px', display: 'flex'  }}>
        <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.userID}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            checkboxSelection
            autoPageSize
            autoHeight
        />
        </Box>
    </Box>
    )
}

export default adminHome