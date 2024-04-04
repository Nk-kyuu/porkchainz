import React, { useState } from 'react';
import { Button, CssBaseline, Grid, Box, Typography, Container, MenuItem,TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../components/navbarFarmer";
import axios from 'axios'; // เพิ่ม import สำหรับ axios
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';



const FarmerAdd = () => {
  const defaultTheme = createTheme();
  const [formData, setFormData] = useState({
    pigWeight: '',
    pigStartDate: null,
    pigHealth: '',
    pigEndDate: null,
    pigBreed: 'DorocJerse', // default value
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
    // ตรวจสอบว่าทุกช่องมีข้อมูลหรือไม่
    if (!formData.pigWeight || !formData.pigStartDate || !formData.pigHealth || !formData.pigEndDate || !formData.pigBreed) {
      alert('Please fill in all fields'); // แสดงข้อความแจ้งเตือน
      return; // ยกเลิกการทำงานของฟังก์ชันหากไม่มีข้อมูลที่ต้องการ
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
                  label="weight"
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
                  label="health"
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
                   name="pigBreed" // ตรงนี้ต้องตรงกับชื่อฟิลด์ในฐานข้อมูล
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
