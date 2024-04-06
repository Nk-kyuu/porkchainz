import { Button,TextField,CssBaseline,Grid,Box,Typography,Container,MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../components/navbarSlaghterer"

import React, { useState } from 'react';
import axios from 'axios'; // เพิ่ม import สำหรับ axios
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';

const SlaughtererSend = () => {
    const defaultTheme = createTheme();

    const [formData, setFormData] = useState({
      source: '',
      retailerID: '1', // default value
      sendDate: '',
      estimateArrivalDate: '',
      //email: localEmail
    });

    const handleChange = (event) => {
      if (event.target.name === 'retailerID') {
        setFormData({ ...formData, retailerID: event.target.value });
      } else {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      }
    };

    // const handleChange = (event) => {
    //   setFormData({ ...formData, [event.target.name]: event.target.value });
    // };

    const handleSendDateChange = (date) => {
      setFormData({ ...formData, sendDate: date });
    };

    const handleEstimateArrivaltDateChange = (date) => {
      setFormData({ ...formData, estimateArrivalDate: date });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!formData.source || !formData.retailerID || !formData.sendDate || !formData.estimateArrivalDate) {
        alert('Please fill in all fields'); 
        return; 
      }
    
      // const email = localStorage.getItem('email');
      // if (!email) {
      //   alert('No email found. Please log in.'); 
      //   return;
      // }
      // const dataToSend = { ...formData, email }; // เพิ่ม email ในข้อมูลที่จะส่งไป
    
      try {
        const response = await axios.post('http://localhost:5000/api/slaughtererSend', formData); // ใช้ axios.post แทน fetch
        //console.log(formData);
        if (!response.data.success) {
          throw new Error('Failed to add shipment');
        }
    
        // Redirect
        window.location.href = '/slaughtererAddShip';
      } catch (error) {
        console.error('Error adding shipment:', error);
      }
    };

    
      const currencies = [
        {
          value: '1',
          label: 'R00001',
        },
        
        {
          value: '2',
          label: 'R00002',
        },

        {
          value: '3',
          label: 'R00003',
        }
        
        
      ];

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
              bgcolor: 'white', // เพิ่มสีขาวให้กับกล่อง
              border: '2px solid #ccc', // ขยายขอบกล่องให้ใหญ่ขึ้น
              borderRadius: '12px', // ขอบมนขึ้น
              padding: '20px', // เพิ่ม padding เพื่อให้มีพื้นที่ของข้อความ
              boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)' // เพิ่มเงาให้กล่อง,
            }}
          >
            <Typography component="h1" variant="h5">
              Shipment Information
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="source"                   
                    fullWidth
                    id="source"
                    //label="Source"
                    placeholder='Source'
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        //id="outlined-select-currency"
                        id='destination'
                        select
                        //label="destination"
                        defaultValue="1"
                        onChange={handleChange}
                        helperText="Please select destination">
                        {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </TextField>
                </Grid> 

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker>
                      {/* id="sendDate" */}
                      label="sendDate"
                      {/* name="sendDate" */}
                      {/* autoComplete="sendDate" */}
                      value={formData.sendDate}
                      onChange={handleSendDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    </DatePicker>
                  </LocalizationProvider>
                </Grid>
                

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker>
                      {/* id="estimateArrivaltDate" */}
                      label="estimateArrivaltDate"
                      {/* name="estimateArrivaltDate" */}
                      {/* autoComplete="estimateArrivaltDate" */}
                      value={formData.estimateArrivaltDate}
                      onChange={handleEstimateArrivaltDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    </DatePicker>
                  </LocalizationProvider>
                </Grid>
                                                              
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}> 
                <Button
                  href='/slaughtererAddShip'
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{ width: '50%' }}
                            >
                              send
                </Button>
              </Box>              
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
        
    );
  }
  
  export default SlaughtererSend;