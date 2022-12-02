const { ethers } = require("ethers");
const hre = require("hardhat");
const abi = require("../artifacts/contracts/Trustee.sol/Trustee.json").abi;
require("dotenv").config();

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );
  const trusteeContract = await hre.ethers.getContractFactory("Trustee");
  const cloneContract = await hre.ethers.getContractFactory("cloneFactory");
  let provider = ethers.getDefaultProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );
  let signer = new ethers.Wallet(process.env.Polygon_PRIVATE_KEY, provider);
  const deployedContract = await trusteeContract.deploy();
  await deployedContract.deployed();
  console.log("Trustee contract address:", deployedContract.address);
  const txn = await deployedContract.periodInSecs();
  console.log(txn);
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
