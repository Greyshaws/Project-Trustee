const { ethers } = require("ethers");
const hre = require("hardhat");
const abi = require("../artifacts/contracts/Trustee.sol/Trustee.json").abi;
require("dotenv").config();

async function main() {
  const trusteeContract = await hre.ethers.getContractFactory(
    "contracts/Trustee.sol:Trustee"
  );
  const faucetContract = await hre.ethers.getContractFactory("Faucet");
  const cloneContract = await hre.ethers.getContractFactory("cloneFactory");
  let provider = ethers.getDefaultProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );

  let signer = new ethers.Wallet(process.env.Polygon_PRIVATE_KEY, provider);
  const deployedContract = await trusteeContract.deploy();
  await deployedContract.deployed();
  const deployedFaucetContract = await faucetContract.deploy(
    "Will Faucet Token",
    "WFT"
  );
  await deployedFaucetContract.deployed();
  console.log("Trustee contract address:", deployedContract.address);
  console.log("Faucet contract address:", deployedFaucetContract.address);
  const deployedCloneContract = await cloneContract.deploy(
    deployedContract.address
  );
  await deployedCloneContract.deployed();
  console.log("Clone contract address:", deployedCloneContract.address);
  const contract = new ethers.Contract(
    deployedCloneContract.address,
    abi,
    signer
  );
  // Create trust from clone

  // const clone = await contract.createTrust(
  //   2,
  //   "0x6D69AFE28964a746E372eD8f67097B6a46532F32",
  //   "a test"
  // );
  // console.log(clone);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
