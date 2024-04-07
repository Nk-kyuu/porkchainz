import { useState, useEffect} from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import {Web3} from 'web3';
import PigContractABI from '../../abi/ABI_AddPig'; // Import the ABI of the PigContract

const PigDashboard = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [pigId, setPigId] = useState('');
    const [pigData, setPigData] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            try {
                if (window.ethereum) {
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    // Request account access if needed
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    const networkId = await web3Instance.eth.net.getId();
                    const deployedNetwork = PigContractABI.networks[networkId];
                    if (!deployedNetwork) {
                        throw new Error('Contract not deployed on the current network');
                    }
                    const contractInstance = new web3Instance.eth.Contract(
                        PigContractABI.abi,
                        deployedNetwork && deployedNetwork.address
                    );
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
                <Typography variant="h4">Pig Dashboard</Typography>
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
                {pigData && (
                    <Box my={2}>
                        <Typography variant="h6">Pig ID: {pigData[0]}</Typography>
                        <Typography variant="body1">Pig Weight: {pigData[1]}</Typography>
                        <Typography variant="body1">Pig Health: {pigData[2]}</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default PigDashboard;


