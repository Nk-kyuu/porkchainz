import { Button,TextField,Avatar,CssBaseline,Grid,Box,Typography,Container,MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import React, { useState } from 'react';
import axios from 'axios'; // เพิ่ม import สำหรับ axios
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';

const SlaughtererAdd = () => {
  const defaultTheme = createTheme();
  const [formData, setFormData] = useState({
    productName: '',
    productWeight: '',
    productDate: '',
    batchID: '1', // default value
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleProductDateChange = (date) => {
    setFormData({ ...formData, productDate: date });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/slaughtererAdd', formData); // ใช้ axios.post แทน fetch
      console.log(formData);
      if (!response.data.success) {
        throw new Error('Failed to add product');
      }

      // Redirect
      window.location.href = '/slaughtererProduct';
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  

  const currencies = [
    {
      value: '1',
      label: '00001',
    },
        
    {
      value: '2',
      label: '00002',
    },

    {
      value: '3',
      label: '00003',
    }
        
        
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
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
              Product Infomation
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="productName"                   
                    fullWidth
                    id="productName"
                    placeholder='Procuct Name'
                    //label="productName"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="productWeight"
                    placeholder='Product Weight'
                    //label="productWeight"
                    name="productWeight"
                    autoComplete="productWeight"
                    onChange={handleChange}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker>
                      {/* id="productDate" */}
                      label="productDate"
                      {/* name="productDate" */}
                      {/* autoComplete="productDate" */}
                      value={formData.productDate}
                      onChange={handleProductDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    </DatePicker>
                  </LocalizationProvider>
                </Grid>  
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="batchID"
                        select
                        //placeholder='batchID'
                        //label="batchID"
                        defaultValue="1"
                        value={formData.batchID}
                        name="batchID"
                        onChange={handleChange}
                        helperText="Please select BatchID">
                        {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                    </TextField>
                </Grid>              
              </Grid>
              <Button
                onClick={() => {window.location.href = '/slaughtererProduct';}}
                //href='/slaughtererProduct'
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>              
            </Box>
          </Box>
          
      </Container>
    </ThemeProvider>
        
  );
}
  
export default SlaughtererAdd;