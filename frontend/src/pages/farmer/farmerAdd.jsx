import { useState, useEffect } from 'react';
import { Button, CssBaseline, Grid, Box, Typography, Container, MenuItem, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../components/navbarFarmer";
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { ethers } from 'ethers'; // Import ethers
import { contractAbi, contractAddress } from '../../Constant/constant'; // Import contract ABI and address

const FarmerAdd = () => {
  const defaultTheme = createTheme();
  const [formData, setFormData] = useState({
    pigWeight: '',
    pigStartDate: null,
    pigHealth: '',
    pigEndDate: null,
    pigBreed: 'DorocJerse',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, pigStartDate: date });
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, pigEndDate: date });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.pigWeight || !formData.pigStartDate || !formData.pigHealth || !formData.pigEndDate || !formData.pigBreed) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/addPig', formData);
      if (!response.data.success) {
        throw new Error('Failed to add pig');
      }
      window.location.href = '/farmerDashPig';
    } catch (error) {
      console.error('Error adding pig:', error);
    }
    
    try {
      // Call function to add pig to the supply chain
      await addPigToSupplyChain(formData.pigWeight, formData.pigStartDate, formData.pigHealth, formData.pigEndDate, formData.pigBreed);
      window.location.href = '/farmerDashPig';
    } catch (error) {
      console.error('Error adding pig:', error);
    }
  };

  const currencies = [
    {
      value: 'DorocJerse',
      label: 'DorocJerse',
    },
    {
      value: 'Landrace',
      label: 'Landrace',
    },
    {
      value: 'LargeWhite',
      label: 'LargeWhite',
    }
  ];

  // Function to connect to Metamask
  const connectToMetamask = async () => {
    try {
      // Request Metamask access to user accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  };

  useEffect(() => {
    // Check if Metamask is connected
    if (typeof window.ethereum !== 'undefined') {
      connectToMetamask();
    }
  }, []);

  // Function to add pig to the supply chain
  async function addPigToSupplyChain(weight, startDate, health, endDate, breed) {
    try {
      // Connect to Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract instance
      const supplyChainContract = new ethers.Contract(contractAddress, contractAbi, signer);

      // Call contract function to add pig
      const transaction = await supplyChainContract.addPig(weight, startDate, health, endDate, breed);
      await transaction.wait();
    } catch (error) {
      console.error('Error adding pig to supply chain:', error);
    }
  }

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
          }}
        >
          <Typography component="h1" variant="h5">
            Add Pig
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="pigWeight"
                  fullWidth
                  id="pigWeight"
                  label="Weight"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={formData.pigStartDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="pigHealth"
                  label="Health"
                  name="pigHealth"
                  autoComplete="health"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={formData.pigEndDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="pigBreed"
                  select
                  label="Breed"
                  name="pigBreed"
                  value={formData.pigBreed}
                  onChange={handleChange}
                  helperText="Please select Breed"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default FarmerAdd;
