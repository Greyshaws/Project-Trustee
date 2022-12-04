import { ethers, providers } from "ethers";
import contractABI from "./contract_abi.json";
import { providerOptions } from "./config";

const contract = String(process.env.NEXT_PUBLIC_CONTRACT)


export async function createTrust(interval, title, beneficiaries) {

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(contract, contractABI, signer);

    const result = await currentContract.createTrust(interval, title, beneficiaries);

    await result.wait()

    return result
}


export async function getMyTrustBeneficiaries() {

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(contract, contractABI, signer);

    const result = await currentContract.getMyTrustBeneficiaries();

    await result.wait()

    return result

}

export async function getMyTrust() {

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(contract, contractABI, signer);

    const result = await currentContract.getMyTrust();

    await result.wait()

    return result

}


export async function updateMyTrustBeneficiaries(indexes, beneficiaries) {

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(tokenContract, contractABI, signer);

    const result = await currentContract.updateMyTrustBeneficiaries(indexes, beneficiaries);

    await result.wait()

    return result
    
}


export async function addToMyTrustBeneficiaries(indexes, beneficiaries) {

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(contract, contractABI, signer);

    const result = await currentContract.addToMyTrustBeneficiaries(indexes, beneficiaries);

    await result.wait()

    return result

}