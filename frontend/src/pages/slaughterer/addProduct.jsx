import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import abiAddPro from '../../abi/ABI_AddPro';
import Web3 from 'web3'
import Navbar from '../../components/navbarSlaghterer';

const AddProduct = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [productName, setProductName] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    useEffect(() => {
        async function initWeb3() {
            try {
                if (window.ethereum) {
                    const web3Instance = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setWeb3(web3Instance);
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);
                    const contractAddress = '0x1b76D09b36F144d806089580B030AE6Fb6b71767';
                    const contractInstance = new web3Instance.eth.Contract(abiAddPro, contractAddress);
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
        
        const userID = localStorage.getItem('userID')
        try {
            if (!web3 || !contract) {
                console.error('Web3 or contract not initialized');
                return;
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const senderAddress = accounts[0];
            const transaction = await contract.methods.addProduct(productWeight, productName).send({ from: senderAddress, gas: 5000000 });
            const txHash = transaction.transactionHash;
            setTransactionHash(txHash);
            await axios.post('http://localhost:5000/api/addPro', { productWeight, productName, userID, transactionHash: txHash });
            setProductWeight('');
            setProductName('');
            window.location='/slaughtererProduct'
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
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
                                    label="Product Weight"
                                    value={productWeight}
                                    onChange={(e) => setProductWeight(e.target.value)}
                                    fullWidth
                                    autoFocus
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    type="text"
                                    label="Product Name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Add Product
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default AddProduct;
