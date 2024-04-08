import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import abiAddShipment from '../../abi/ABI_AddShipment';
import {Web3} from 'web3'
import Navbar from "../../components/navbarSlaghterer";
const AddShipment = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
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
                    const contractAddress = '0x2725F22f4004F1F77905A9A05073E0000623D119';
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
        
        const userID = localStorage.getItem('userID')
        try {
            if (!web3 || !contract) {
                console.error('Web3 or contract not initialized');
                return;
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const senderAddress = accounts[0];
            const transaction = await contract.methods.addShipment(destination ,source).send({ from: senderAddress, gas: 6000000 });
            const txHash = transaction.transactionHash;
            setTransactionHash(txHash);
            await axios.post('http://localhost:5000/api/addShip', { source, destination, transactionHash: txHash });
            setSource('');
            setDestination('');            
            window.location = '/slaughtererProduct';
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
                                Add Shipment
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <TextField
                                    type="text"
                                    label="Destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    fullWidth
                                    autoFocus
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    type="text"
                                    label="Source"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Add Shipment
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default AddShipment;




// import React, { useState, useEffect } from 'react';
// import { Button, TextField, Typography, Container, Box } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import Web3 from 'web3'; // Imported Web3 correctly
// import Navbar from "../../components/navbarSlaghterer";
// import abiAddShipment from '../../abi/ABI_AddShipment';

// const AddShipment = () => {
//     const [web3, setWeb3] = useState(null);
//     const [contract, setContract] = useState(null);
//     const [account, setAccount] = useState('');
//     const [source, setSource] = useState('');
//     const [transactionHash, setTransactionHash] = useState('');
//     const [destination, setDestination] = useState('');

//     useEffect(() => {
//         async function initWeb3() {
//             try {
//                 // Connect to the user's MetaMask provider
//                 if (window.ethereum) {
//                     const web3Instance = new Web3(window.ethereum);
//                     await window.ethereum.request({ method: 'eth_requestAccounts' });
//                     setWeb3(web3Instance);
//                     // Set the default account
//                     const accounts = await web3Instance.eth.getAccounts();
//                     setAccount(accounts[0]);
//                     // Create an instance of the contract using ABI and contract address
//                     const contractAddress = '0x2725F22f4004F1F77905A9A05073E0000623D119'; // Use your contract address
//                     const contractInstance = new web3Instance.eth.Contract(abiAddShipment, contractAddress);
//                     setContract(contractInstance);
//                 } else {
//                     console.error('Please install MetaMask');
//                 }
//             } catch (error) {
//                 console.error('Error initializing Web3:', error);
//             }
//         }
//         initWeb3();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const userID = localStorage.getItem('userID');
//         try {
//             // Ensure Web3 and contract are initialized
//             if (!web3 || !contract) {
//                 console.error('Web3 or contract not initialized');
//                 return;
//             }
//             // Get the current user's account address
//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const senderAddress = accounts[0];
//             // Call the addShipment function in the smart contract
//             const transaction = await contract.methods.addShipment(destination ,source).send({ from: senderAddress, gas: 5000000 });
//             // Retrieve the transaction hash
//             const txHash = transaction.transactionHash;
//             setTransactionHash(txHash);
//             // Store hash data in the backend database
//             await axios.post('http://localhost:5000/api/addShip', { source, destination, transactionHash: txHash });
//             // Clear input fields after successful submission
//             setSource('');
//             setDestination('');            
//             window.location = '/slaughtererProduct';
//         } catch (error) {
//             console.error('Error submitting transaction:', error);
//         }
//     };

//     return (
//         <ThemeProvider theme={createTheme()}>
//             <div>
//                 <Navbar />
//             </div>
//             <Container maxWidth="xs">
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         bgcolor: 'white',
//                         border: '2px solid #ccc',
//                         borderRadius: '12px',
//                         padding: '20px',
//                     }}
//                 >
//                     <Typography component="h1" variant="h5">
//                         Add Shipment
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         <TextField
//                             type="text"
//                             label="Source"
//                             value={source}
//                             onChange={(e) => setSource(e.target.value)}
//                             fullWidth
//                             autoFocus
//                             sx={{ mb: 2 }}
//                         />
//                         <TextField
//                             type="text"
//                             label="Destination"
//                             value={destination}
//                             onChange={(e) => setDestination(e.target.value)}
//                             fullWidth
//                             autoFocus
//                             sx={{ mb: 2 }}
//                         />
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="error"
//                         >
//                             Add Shipment
//                         </Button>
//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// };

// export default AddShipment;
