import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Web3 } from 'web3';
import abiGetPig from '../../abi/ABI_GetPigHash'; // Import the ABI of the GetPig contract
import axios from 'axios';

const PigDashboard = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [farmerID, setFarmerID] = useState('');
    const [pigHash, setPigHash] = useState('');
    const [pigData, setPigData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const email = localStorage.getItem("email");

    useEffect(() => {
        const initWeb3 = async () => {
            try {
                if (window.ethereum) {
                    const web3Instance = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setWeb3(web3Instance);
                    // Set the default account
                    const accounts = await web3Instance.eth.getAccounts();
                    // Create an instance of the contract using ABI and contract address
                    const contractAddress = '0x5252aB242F58Ce151f80C52754b914Ea6B718d9F'; // Use your contract address
                    const contractInstance = new web3Instance.eth.Contract(abiGetPig, contractAddress);
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

    useEffect(() => {
        const getPigHashFromAPI = async () => {
            try {
                const response = await axios.post('http://localhost:5000/pigHash', { email });
                console.log('Response from API:', response); // Log the response received from the API
                setPigHash(response.data.pigHash);
            } catch (error) {
                console.error('Error fetching pig hash:', error);
            }
        };
        
    
        getPigHashFromAPI();
    }, []);

    useEffect(() => {
        const getPigData = async () => {
            try {
                console.log('Inside getPigData. Contract:', contract, 'Pig Hash:', pigHash);
                if (!contract || !pigHash) {
                    console.error('Contract not initialized or pig hash not available');
                    return;
                }
                setIsLoading(true);
                // Call the smart contract function to get pig data by hash
                console.log('Calling getPigData with pigHash:', pigHash);
                const data = await contract.methods.getPigDataByHash(pigHash).call();
                console.log('Received data:', data); // Check what data is received from the contract call
                setPigData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error getting pig data:', error);
                setIsLoading(false);
            }
        };
    
        console.log('Executing useEffect with contract:', contract, 'Pig Hash:', pigHash);
        
        // Call getPigData only when both contract and pigHash are available and pigHash is not undefined or null
        if (contract && pigHash !== undefined && pigHash !== null) {
            getPigData();
        }
    }, [contract, pigHash]);
    
    
    
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4">Pig Dashboard</Typography>
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
