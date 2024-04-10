import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Paper } from '@mui/material';
import { Web3 } from 'web3';
import abiAddPig from '../../abi/ABI_GetPig'; // Import the ABI of the PigContract

const PigDashboard = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [pigId, setPigId] = useState('');
    const [pigData, setPigData] = useState(null);
    const [account, setAccount] = useState('');

    useEffect(() => {
        const initWeb3 = async () => {
            try {
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
        };
        initWeb3();
    }, []);

    const getPigData = async () => {
        try {
            if (!contract) {
                console.error('Contract not initialized');
                return;
            }
            const data = await contract.methods.getPigDataById(pigId).call();
            setPigData(data);
        } catch (error) {
            console.error('Error getting pig data:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <h4>Pig Dashboard</h4>
                <Box my={2}>
                    <TextField
                        label="Enter Pig ID"
                        variant="outlined"
                        value={pigId}
                        onChange={(e) => setPigId(e.target.value)}
                    />
                </Box>
                <Box my={2}>
                    <Button variant="contained" color="primary" onClick={getPigData}>
                        Get Pig Data
                    </Button>
                </Box>
                {pigData ? (
                    <div>
                        <h6>Pig Data</h6>
                        <div>Pig ID: {parseInt(pigData.pigID.toString())}</div>
                        <div>Pig Weight: {parseInt(pigData.pigWeight.toString())}</div>
                        <div>Pig Health: {pigData.pigHealth}</div>
                    </div>
                ) : (
                    <div>No pig data available</div>
                )}
            </Box>
        </Container>
    );
    
};

export default PigDashboard;
