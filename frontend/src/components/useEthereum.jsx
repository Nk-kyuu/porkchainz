// import { useState, useEffect } from 'react';
// import Web3 from 'web3';

// export function useEthereum() {
//     const [web3, setWeb3] = useState(null);
//     const [contract, setContract] = useState(null);
//     const [account, setAccount] = useState(null);

//     useEffect(() => {
//         async function initializeWeb3() {
//             if (window.ethereum) {
//                 const web3Instance = new Web3(window.ethereum);
//                 setWeb3(web3Instance);

//                 try {
//                     // Request account access if needed
//                     await window.ethereum.request({ method: 'eth_requestAccounts' });
//                     // Get the currently selected account
//                     const accounts = await web3Instance.eth.getAccounts();
//                     setAccount(accounts[0]);
//                 } catch (error) {
//                     console.error('Error connecting to MetaMask:', error);
//                 }
//             } else {
//                 console.error('MetaMask extension not detected');
//             }
//         }

//         initializeWeb3();
//     }, []);

//     useEffect(() => {
//         if (web3) {
//             // Initialize your contract here
//             const contractPorkChain = new web3.eth.Contract(porkChainABI, contractAddress);
//             setContract(contractPorkChain);
//         }
//     }, [web3]);

//     return { web3, contract, account };
// }
