require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    MATIC: {
      url: process.env.API_URL || 'http://127.0.0.1:7545', // Use default URL if environment variable not set
      accounts: [process.env.PRIVATE_KEY],
      gas: 3000000, // Increase the gas limit to a higher value
      gasPrice: 8000000000,
    },
  },
};
