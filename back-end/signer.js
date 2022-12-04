const { Wallet, ethers } = require('ethers');
const ABI = require("./abi/contract_abi.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT = process.env.CONTRACT

const alchemyProvider = new ethers.providers.AlchemyProvider("maticmum", process.env.API_KEY);

const wallet = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const signer = wallet.connect(alchemyProvider);
const contract = new ethers.Contract(CONTRACT, ABI, signer);



exports.checkSubscriptions = async () => {
    const result = await contract.subscriptionCount()
    return result._hex
}

exports.getSubscriptions = async(start, end) => {
    const result = await contract.getSubscriptions(start, end)
    return result
}


exports.getTrustStatus = async(ownerAddress) => {
    const result = await contract.trustStatus(ownerAddress)
    return result
}

exports.bulkTransfers = async(ownerAddress) => {
    const result = await contract.bulkTransfers(ownerAddress)
    await result.wait()
    return result
}
