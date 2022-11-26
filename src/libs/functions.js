import { ethers, providers } from "ethers";
import tokenABI from "./token_abi.json";
import nftABI from "./nft_abi.json";
import { providerOptions } from "./config";

const contract = String(process.env.NEXT_PUBLIC_CONTRACT)


export async function approve(nftAddress, tokenId) {

    //for NFTs grant us approval

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(nftAddress, nftABI, signer);

    const result = await currentContract.approve(contract, tokenId);

    await result.wait()

    return result
}


export async function getApproved(reciever, tokenUrl) {

    //for NFTs grant us approval

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(nftAddress, nftABI, signer);

    const result = await currentContract.approve(contract, tokenId);

    await result.wait()

    return result

}


export async function approveForTokens(tokenContract, amount) {

    //for Tokens grant us approval to spend a setting amount of tokens

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(tokenContract, tokenABI, signer);

    const result = await currentContract.approve(contract, amount);

    await result.wait()

    return result
    
}


export async function getApprovedTokens(nftAddress, owner) {

    // For Tokens get the number of tokens granted to our contract to spend

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(nftAddress, nftABI, signer);

    const result = await currentContract.allowance(owner, contract);

    return parseInt(result._hex, 16) / (10 ** 18)

}

