// import React, { useState } from 'react';
// import { Button, CssBaseline, Grid, Box, Typography, Container, MenuItem, TextField } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import abiAddPig from '../../abi/ABI_AddPig';
// import Web3 from 'web3'

// const FarmerAdd = () => {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState('');
//   const [pigWeight, setPigWeight] = useState('');
//   const [pigHealth, setPigHealth] = useState('');

//   const [pigEndDate, setPigEndDate] = useState('');
  

//   const [transactionHash, setTransactionHash] = useState('');

//   const handleEndDateChange = (date) => {
//     setFormData({ ...formData, pigEndDate: date });
//   };

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   // ตรวจสอบว่าทุกช่องมีข้อมูลหรือไม่
//   //   if (!formData.pigWeight || !formData.pigStartDate || !formData.pigHealth || !formData.pigEndDate || !formData.pigBreed) {
//   //     alert('Please fill in all fields'); // แสดงข้อความแจ้งเตือน
//   //     return; // ยกเลิกการทำงานของฟังก์ชันหากไม่มีข้อมูลที่ต้องการ
//   //   }
//   //   try {
//   //     const response = await axios.post('http://localhost:5000/api/addPig', formData);
//   //     if (!response.data.success) {
//   //       throw new Error('Failed to add pig');
//   //     }
//   //   }
//   //   initWeb3();
//   // }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Ensure Web3 and contract are initialized
//       if (!web3 || !contract) {
//         console.error('Web3 or contract not initialized');
//         return;
//       }
//       // Get the current user's account address
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const senderAddress = accounts[0];
//       // Call the addPig function in the smart contract
//       const transaction = await contract.methods.addPig(pigWeight, pigHealth, pigStartDate, pigEndDate, pigBreed).send({ from: senderAddress, gas: 5000000 });
//       // Retrieve the transaction hash
//       const txHash = transaction.transactionHash;
//       setTransactionHash(txHash);
//       // Store hash data in the backend database
//       await axios.post('http://localhost:5000/api/pigAdd', { pigWeight, pigHealth, pigStartDate, pigEndDate, pigBreed, transactionHash: txHash });
//       // Clear input fields after successful submission
//       setPigWeight('');
//       setPigHealth('');
//       setPigStartDate('');
//       setPigStartDate('');
//       setPigStartDate('');
//       setPigBreed('');
//     } catch (error) {
//       console.error('Error submitting transaction:', error);
//     }
//   };

//   const currencies = [
//     {
//       value: 'DorocJerse',
//       label: 'DorocJerse',
//     },
//     {
//       value: 'Landrace',
//       label: 'Landrace',
//     },
//     {
//       value: 'LargeWhite',
//       label: 'LargeWhite',
//     }
//   ];

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Navbar />
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             bgcolor: 'white',
//             border: '2px solid #ccc',
//             borderRadius: '12px',
//             padding: '20px',
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Add Pig
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2} >
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="pigWeight"
//                   fullWidth
//                   id="pigWeight"
//                   label="weight"
//                   autoFocus
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label="Start Date"
//                     value={formData.pigStartDate}
//                     onChange={handleStartDateChange}
//                   >
//                     {(params) => <TextField {...params} />}
//                   </DatePicker>
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   id="pigHealth"
//                   label="health"
//                   name="pigHealth"
//                   autoComplete="health"
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label="End Date"
//                     value={formData.pigEndDate}
//                     onChange={handleEndDateChange}
//                   >
//                     {(params) => <TextField {...params} />}
//                   </DatePicker>
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   id="pigBreed"
//                   select
//                   label="Breed"
//                   name="pigBreed" // ตรงนี้ต้องตรงกับชื่อฟิลด์ในฐานข้อมูล
//                   value={formData.pigBreed}
//                   onChange={handleChange}
//                   helperText="Please select Breed"
//                 >
//                   {currencies.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             </Grid>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="error"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Add
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default FarmerAdd;