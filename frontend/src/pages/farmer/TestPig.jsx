import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import abiAddPig from '../../abi/ABI_AddPig';
import Web3 from 'web3'
import Navbar from '../../components/navbarFarmer';
const TestPig = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [pigWeight, setPigWeight] = useState('');
    const [pigHealth, setPigHealth] = useState('');
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
                    const contractAddress = '0x5252aB242F58Ce151f80C52754b914Ea6B718d9F'; // Use your contract address
                    const contractInstance = new web3Instance.eth.Contract(abiAddPig, contractAddress);
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
            // Ensure Web3 and contract are initialized
            if (!web3 || !contract) {
                console.error('Web3 or contract not initialized');
                return;
            }
            // Get the current user's account address
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const senderAddress = accounts[0];
            // Call the addPig function in the smart contract
            const transaction = await contract.methods.addPig(pigWeight, pigHealth).send({ from: senderAddress, gas: 5000000 });
            // Retrieve the transaction hash
            const txHash = transaction.transactionHash;
            setTransactionHash(txHash);
            // Store hash data in the backend database
            await axios.post('http://localhost:5000/api/addPig', { pigWeight, pigHealth,userID, transactionHash: txHash });
            // Clear input fields after successful submission
            setPigWeight('');
            setPigHealth('');
            
            window.location='/farmerDashPig'
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
                        Add Pig
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            type="text"
                            label="Pig Weight"
                            value={pigWeight}
                            onChange={(e) => setPigWeight(e.target.value)}
                            fullWidth
                            autoFocus
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            type="text"
                            label="Pig Health"
                            value={pigHealth}
                            onChange={(e) => setPigHealth(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            
                        >
                            Add Pig
                        </Button>         
                    </Box>
                </Box>
            </Container>
        </ThemeProvider></div></div>
        
    );
};

export default TestPig;