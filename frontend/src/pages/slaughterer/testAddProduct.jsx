import React, { useState, useEffect } from 'react';
import { Web3 } from 'web3'; // Import Web3 library
import abiAddProduct from '../../abi/ABI_AddProduct.json'; // Import ABI of the smart contract
import axios from 'axios'; // Import Axios for making HTTP requests
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function TestAddProduct() {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [productName, setProductName] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productDate, setProductDate] = useState('');
    const [batchID, setBatchID] = useState(''); // Added batchID state variable
    const [transactionHash, setTransactionHash] = useState('');

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
                    const contractAddress = '0x1e1361964b7839285b1c1b5733Bbd0a3B425Cc58'; // Use your contract address
                    const contractInstance = new web3Instance.eth.Contract(abiAddProduct, contractAddress);
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
            // Call the addProduct function in the smart contract
            const transaction = await contract.methods.addProduct(productWeight,productName).send({ from: senderAddress, gas: 5000000000 });
            // Retrieve the transaction hash
            const txHash = transaction.transactionHash;
            setTransactionHash(txHash);
            // Store hash data in the backend database
            await axios.post('http://localhost:5000/api/slaughtererAdd', { productName, productWeight, transactionHash: txHash }); // Updated to include batchID
            // Clear input fields after successful submission
            setProductName('');
            setProductWeight('');
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }
    };
    

    return (
        <ThemeProvider theme={createTheme()}>
            <Container maxWidth="xs">
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
                        Add Product
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        
                        <TextField
                            type="text"
                            placeholder="Product Weight"
                            value={productWeight}
                            onChange={(e) => setProductWeight(e.target.value)}
                            fullWidth
                            autoFocus
                            sx={{ mb: 2 }}
                        /><TextField
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            fullWidth
                            autoFocus
                            sx={{ mb: 2 }}
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            fullWidth
                        >
                            Add Product
                        </Button>
                        {transactionHash && (
                            <Box mt={2}>
                                <Typography variant="body1">Transaction Hash: {transactionHash}</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default TestAddProduct;
