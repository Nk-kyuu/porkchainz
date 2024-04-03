import React, { useState } from 'react';
import { Button, TextField, Avatar, CssBaseline, Grid, Box, Typography, Container, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../components/navbarFarmer";
import axios from 'axios';


const FarmerAdd = () => {
  const defaultTheme = createTheme();
  const [formData, setFormData] = useState({
    pigWeight: '',
    pigStartDate: '',
    pigHealth: '',
    pigEndDate: '',
    pigBreed: 'DJ', // default value
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/addPig', { // เชื่อมต่อกับ backend ที่รันบน localhost:5000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add pig');
      }

      // Redirect to farmer dashboard after successful addition
      window.location.href = '/farmerDashPig';
    } catch (error) {
      console.error('Error adding pig:', error);
    }
  };

  const currencies = [
    {
      value: 'DJ',
      label: 'DorocJerse',
    },
    {
      value: 'LR',
      label: 'Landrace',
    },
    {
      value: 'LW',
      label: 'LargeWhite',
    }
  ];

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
    bgcolor: 'white', // เพิ่มสีขาวให้กับกล่อง
    border: '2px solid #ccc', // ขยายขอบกล่องให้ใหญ่ขึ้น
    borderRadius: '12px', // ขอบมนขึ้น
    padding: '20px', // เพิ่ม padding เพื่อให้มีพื้นที่ของข้อความ
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
                  label="weight"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="pigStartDate"
                  label="startDate"
                  name="pigStartDate"
                  autoComplete="startDate"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="pigHealth"
                  label="health"
                  name="pigHealth"
                  autoComplete="health"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="pigEndDate"
                  label="endDate"
                  name="pigEndDate"
                  autoComplete="endDate"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  id="pigBreed"
                  select
                  label="Breed"
                  name="pigBreed"
                  value={formData.breed}
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
                href="/farmerDashPig"
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
