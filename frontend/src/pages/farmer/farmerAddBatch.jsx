import { Button, TextField, Avatar, CssBaseline, Grid, Box, Typography, Container, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/navbarFarmer";

const FarmerAddBatch = () => {

    const [totalWeight, setTotalWeight] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [batchName, setBatchName] = useState("");
    const [batchDescription, setBatchDescription] = useState("");
    //email
    // const localEmail = localStorage.getItem("email")


    useEffect(() => {
        const selectedRowsData = JSON.parse(localStorage.getItem('selectedRowsData'));
        if (selectedRowsData && selectedRowsData.length > 0) {
            const sumWeight = selectedRowsData.reduce((total, row) => {
                const weight = parseFloat(row.pigWeight);
                if (!isNaN(weight)) {
                    return total + weight;
                } else {
                    console.error('Invalid weight:', row.pigWeight);
                    return total;
                }
            }, 0);
            setTotalWeight(sumWeight);
            setTotalQuantity(selectedRowsData.length);
        }
    }, []);

    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!batchName || batchName.trim() === "" || !batchDescription || batchDescription.trim() === "") {
            alert("Please enter Batchname and Description");
            return;
        }
        const selectedRowsData = JSON.parse(localStorage.getItem('selectedRowsData'));
        const pigID = selectedRowsData ? selectedRowsData.map(row => row.pigID) : [];

        axios.post('http://localhost:5000/createBatch', {
            batchName: batchName,
            pigID: pigID,
            batchDescription: batchDescription
        })
            .then(response => {
                console.log('Response:', response);
                window.location.href = '/farmerDashBatch';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Batch
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="batchName"
                                    fullWidth
                                    id="batchName"
                                    label="batchName"
                                    autoFocus
                                    onChange={(event) => setBatchName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="quantity"
                                    label="quantity"
                                    value={totalQuantity.toString()}
                                    disabled
                                    name="quantity"
                                    autoComplete="quantity"
                                    sx={{
                                        '& label': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="weight"
                                    label="weight"
                                    name="weight"
                                    value={`${totalWeight.toString()} kg`}
                                    disabled
                                    autoComplete="weight"
                                    onChange={(event) => setTotalWeight(event.target.value)}
                                    sx={{
                                        '& label': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="description"
                                    name="description"
                                    autoComplete="description"
                                    value={batchDescription}
                                    onChange={(event) => setBatchDescription(event.target.value)}
                                    sx={{
                                        '& label': {
                                            color: 'white'
                                        }
                                    }}

                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                            <Button
                                href='/farmerDashPig'
                                variant="contained"
                                color="error"
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="warning"
                                sx={{ ml: 1 }}

                            >
                                Add
                            </Button>
                        </Grid>
                    </Box>
                </Box>

            </Container>

        </ThemeProvider>

    );
}

export default FarmerAddBatch;