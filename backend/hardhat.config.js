require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "MATIC",
   networks: {
     hardhat: {},
     MATIC: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 3000000, // Increase the gas limit to a higher value
      gasPrice: 8000000000,
     },
   },

};
