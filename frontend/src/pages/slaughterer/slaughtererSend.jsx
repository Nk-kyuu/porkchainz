import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, CssBaseline, Grid, Box, Typography, Container, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from "../../components/navbarSlaghterer";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers';

import {Web3} from 'web3';
import abiAddShipment from '../../abi/ABI_AddShipment';

function SlaughtererSend() {
  const defaultTheme = createTheme();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);  
  const [account, setAccount] = useState('');
  const [source, setSource] = useState('');
  // const [destination, setDestination] = useState('');
  // const [sendDate, setSendDate] = useState(null);
  const [estimateArrivalDate, setEstimateArrivalDate] = useState(null);
  // const [retailerIDs, setRetailerIDs] = useState([]);
  const [transactionHash, setTransactionHash] = useState('');
  
  // const [formData, setFormData] = useState({
  //       source: '',
  //       destination: '',
  //       sendDate: null,
  //       estimateArrivalDate: null
  // });
    
  useEffect(() => {
    async function initWeb3() {
      try {
        // Connect to the user's MetaMask provider
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWeb3(web3Instance);
            // Set the default account
            const accounts = await web3Instance.eth.getAccounts();
            setAccount(accounts[0]);
            // Create an instance of the contract using ABI and contract address
            const contractAddress = '0x2725F22f4004F1F77905A9A05073E0000623D119'; // Use your contract address
            const contractInstance = new web3Instance.eth.Contract(abiAddShipment, contractAddress);
            setContract(contractInstance);
          } else {
            console.error('Please install MetaMask');
          }
      } catch (error) {
        console.error('Error initializing Web3:', error);
      }
    }
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure Web3 and contract are initialized
      if (!web3 || !contract) {
        console.error('Web3 or contract not initialized');
        return;
      }
      // Get the current user's account address
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const senderAddress = accounts[0];
      // Call the addPig function in the smart contract
      const transaction = await contract.methods.addShipment(source, estimateArrivalDate).send({ from: senderAddress, gas: 5000000 });
      // Retrieve the transaction hash
      const txHash = transaction.transactionHash;
      setTransactionHash(txHash);
      // Store hash data in the backend database
      await axios.post('http://localhost:5000/createShip', { source, estimateArrivalDate, transactionHash: txHash });
      
      // if (!formData.source || !formData.destination) {
      //   alert('Please fill in all fields');
      //   return;
      // }
      // const userID = localStorage.getItem('userID');
      // const productID = localStorage.getItem('productID'); // Retrieve product value
      // if (!userID) {
      //   alert('No email found. Please log in.');
      //   return;
      // }
      // const dataToSend = { ...formData, userID, productID }; // Include product in dataToSend
      // console.log(dataToSend)
      // try {
      //   const response = await axios.post('http://localhost:5000/createShip', dataToSend);
      //   if (!response.data.success) {
      //     throw new Error('Failed to add product');
      //   }
      //   window.location.href = '/slaughtererProduct';
      // } catch (error) {
      //     console.error('Error adding product:', error);
      // }
      
      
      // Clear input fields after successful submission
      setSource('');
      // setDestination('');
      // setSendDate(null);
      setEstimateArrivalDate(null);
      window.location.href = '/slaughtererProduct';
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } 
  };




//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };
  
//   const handleDesChange = (event) => {
//     setFormData({ ...formData, destination: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!formData.source || !formData.destination) {
//       alert('Please fill in all fields');
//       return;
//     }
//   const userID = localStorage.getItem('userID');
//   const productID = localStorage.getItem('productID'); // Retrieve product value
//   if (!userID) {
//     alert('No email found. Please log in.');
//     return;
//   }
//   const dataToSend = { ...formData, userID, productID }; // Include product in dataToSend
//   console.log(dataToSend)
//     try {
//       const response = await axios.post('http://localhost:5000/createShip', dataToSend);
//       if (!response.data.success) {
//         throw new Error('Failed to add product');
//       }
//       window.location.href = '/slaughtererProduct';
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/retailerID');
  //       if (response.data.success) {
  //         const RetailerIDList = response.data.retailerIDs.map(retailer => ({
  //           value: retailer,
  //           label: retailer
  //         }));
  //         setRetailerIDs(RetailerIDList);
  //       } else {
  //         throw new Error('Failed to fetch retailer names');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching retailer names:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
                  onChange={(e) => setSource(e.target.value)}

                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  id="destination"
                  select
                  value={destination}
                  name="destination"
                  onChange={(e) => setDestination(e.target.value)}

                  placeholder="Destination"
                  fullWidth
                >
                  {retailerIDs.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}

              {/* <Grid item xs={12} sm={6}>
                
                <TextField
                  autoComplete="given-name"
                  name="sendDate"
                  fullWidth
                  id="sendDate"
                  placeholder="Send Date"
                  autoFocus
                  onChange={(e) => setSendDate(e.target.value)}

                />
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="sendDate"
                    name="sendDate"
                    autoComplete="sendDate"
                    value={sendDate}
                    //onChange={(date) => setFormData({ ...formData, sendDate: date })}
                    onChange={(e) => setSendDate(e.target.value)}
                    //renderInput={(params) => <TextField {...params} />}
                  >
                  {({ inputRef, inputProps, ...other }) => (
                    <TextField {...inputProps} {...other} />
                  )}
                </DatePicker>
                </LocalizationProvider>
              </Grid> */}

<Grid item xs={12} sm={6}>
                
                <TextField
                  autoComplete="estimateArrivalDate"
                  name="estimateArrivalDate"
                  fullWidth
                  id="estimateArrivalDate"
                  placeholder="estimateArrivalDate"
                  autoFocus
                  onChange={(e) => setEstimateArrivalDate(e.target.value)}

                />
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
