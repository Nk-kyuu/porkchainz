const { ethers } = require("hardhat");

async function main() {
  try {
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    console.log("Deploying SupplyChain contract...");
    const supplyChain = await SupplyChain.deploy();
    
    console.log("SupplyChain contract deployed:", supplyChain);
    console.log("SupplyChain contract address:", supplyChain.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exit(1);
  }
}

main();



// Deploy
//   npx hardhat run --network MATIC scripts/deploy.js 

//  supplyChain.address ไปแปะฟั่ง Frontend constant.js


