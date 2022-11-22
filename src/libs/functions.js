import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import tokenABI from "./abi.json";
import { providerOptions } from "./config";

const contract = String(process.env.NEXT_PUBLIC_CONTRACT)


export async function mint(reciever, tokenUrl) {

    const ABI = tokenABI

    const provider = new ethers.providers.Web3Provider(window?.ethereum, 'any');

    const signer = provider.getSigner();

    const currentContract = new ethers.Contract(
        contract,
        ABI,
        signer
    );


    const result = await currentContract.mint(reciever, `ipfs://${tokenUrl}`);

    return result
}