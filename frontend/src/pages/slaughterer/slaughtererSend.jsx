import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, CssBaseline, Grid, Box, Typography, Container, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../components/navbarSlaghterer";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

import Web3 from 'web3';
//import ABI_PorkChain from '../../abis/PorkChain.json'; 


const SlaughtererSend = () => {
  const defaultTheme = createTheme();

  //const ABI = ABI_PorkChain; 

  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    sendDate: null,
    estimateArrivalDate: null
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const handleDesChange = (event) => {
    setFormData({ ...formData, destination: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.source || !formData.destination) {
      alert('Please fill in all fields');
      return;
    }
  const userID = localStorage.getItem('userID');
  const productID = localStorage.getItem('productID'); // Retrieve product value
  if (!userID) {
    alert('No email found. Please log in.');
    return;
  }
  const dataToSend = { ...formData, userID, productID }; // Include product in dataToSend
  console.log(dataToSend)
    try {
      const response = await axios.post('http://localhost:5000/createShip', dataToSend);
      if (!response.data.success) {
        throw new Error('Failed to add product');
      }
      window.location.href = '/slaughtererProduct';
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const [retailerIDs, setRetailerIDs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/retailerID');
        if (response.data.success) {
          const RetailerIDList = response.data.retailerIDs.map(retailer => ({
            value: retailer,
            label: retailer
          }));
          setRetailerIDs(RetailerIDList);
        } else {
          throw new Error('Failed to fetch retailer names');
        }
      } catch (error) {
        console.error('Error fetching retailer names:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
            border: '2px solid #ccc',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)'
          }}
        >
          <Typography component="h1" variant="h5">
            Shipment Information
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="source"
                  fullWidth
                  id="source"
                  placeholder="Source"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="destination"
                  select
                  value={formData.destination}
                  name="destination"
                  onChange={handleDesChange}
                  placeholder="Destination"
                  fullWidth
                >
                  {retailerIDs.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="sendDate"
                    name="sendDate"
                    autoComplete="sendDate"
                    value={formData.sendDate}
                    onChange={(date) => setFormData({ ...formData, sendDate: date })}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="estimateArrivalDate"
                    name="estimateArrivalDate"
                    autoComplete="estimateArrivalDate"
                    value={formData.estimateArrivalDate}
                    onChange={(date) => setFormData({ ...formData, estimateArrivalDate: date })}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ width: '50%' }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SlaughtererSend;





