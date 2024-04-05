// const { ethers } = require("ethers");

async function main() {
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();

  console.log("SupplyChain deployed to:", supplyChain.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// Deploy
//   npx hardhat run --network MATIC scripts/deploy.js 

//  supplyChain.address ไปแปะฟั่ง Frontend constant.js


