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


export async function getApproved(nftAddress, tokenId) {

    //for NFTs grant us approval

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(nftAddress, nftABI, signer);

    const result = (await currentContract.getApproved(tokenId)) === contract;

    console.log("result", (await currentContract.getApproved(tokenId)) )
    console.log(contract)

    return result

}


export async function getNFT(nftAddress, tokenId) {

    //for NFTs return nft details

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(nftAddress, nftABI, signer);

    const name = await currentContract.name();

    const symbol = await currentContract.symbol();

    const tokenUri = await currentContract.tokenURI(tokenId);

    return { name, symbol, tokenUri }

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


export async function getApprovedTokens(tokenAddress, owner) {

    // For Tokens get the number of tokens granted to our contract to spend

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(tokenAddress, tokenABI, signer);

    const result = await currentContract.allowance(owner, contract);

    return parseInt(result._hex, 16)

}


export async function getBalance(tokenAddress, owner) {

    // For Tokens get the balance

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(tokenAddress, tokenABI, signer);

    const result = await currentContract.balanceOf(owner);

    return parseInt(result._hex, 16) / (10 ** 18)

}
