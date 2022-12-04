# Trustee
Cryptocurrency is one of the digital assets that helps us to re-take control over one of the key aspects of our lives, money. It lets us hold, trade, lend and borrow funds without ever having to trust a third party, keeping our key and our money always in our possession.
But what happens to your digital assets after you die?  Is it safe to give a third-party(lawyer/beneficiary) access to your private key? How, if at all, should you go about creating a Trust/Will for your digital assets?

Trustee is a next-generation property conveyance platform that incorporates blockchain technology for security and convenience. It adds another tool to the DeFi toolset, one that's usually overlooked; it provides a means to manage our funds when we aren't here anymore. It offers a decentralized and peer-to-peer solution to the challenges involved in the conveyance and succession of digital assets/properties, by eliminating the middlemen (lawyer/trustee), and making the process seamless and cost-efficient.

With Trustee, creating trusts or testamentary wills becomes a simple process.

1. Enter details of the trust contract.
2. Pick the duration.
3. Enter beneficiary details.
4. Specify particular asset and percentage.
5. Create Trust


## Tech Stack

   1. **Frontend**: Nextjs, Ethersjs, Web3modal, Material UI

   2. **Backend**: Nodejs, Express, Node-cron, MongoDB

   3. **Smart contract**: Solidity, Hardhat


## Use of Product
This product is used for creating and managing decentralized testamentary Wills and Trusts. 

Trustee makes use of the Dead Man Switch model to determine when a beneficiary should be able to access a given Trust. This means that the user upon the creation of a Trust, sets a Trust Period. This Trust Period is a timer, and it starts ticking the moment he activates the Trust, it will also constantly be renewed upon the subscription of the user. This means that so long as the user regularly subscribes to the Trust, the countdown does not get exhausted, as it constantly renews.
But the moment, the user stops subscribing/interacting with the contract, the timer being triggered counts down till it is exhausted, and when this happens, the assets in the Trust will be automatically conveyed to the beneficiary’s address.

### Is there a cost or fee?
Yes, you have to subscribe to the contract periodically to renew the Trust Period. Subscription is done immediately after creating the trust. And there is an option for subsequent subscription.

### Can I add multiple beneficiaries?
Yes, you have the option of adding multiple beneficiaries and inputting their addresses to the contract. You also have to specify the asset type to transfer to each beneficiary. It could be an NFT or a Token. And the particular percentage you wish to transfer to each beneficiary.
The platform also supports the use of a Gnosis-safe wallet address, for users that wish for all beneficiaries to access the same trust contract.

### Can I add a description to my trust?
Yes, you can add a title and description to your Trust.

### Can I deposit ERC20 tokens and NFTs?
Yes, the platform supports multiple asset types. 
For NFT’s, you have to input the NFT address and the token ID, for it to be eligible for transfer.
And for tokens, the platform supports multiple tokens on the Polygon network, e.g USDC, USDT, etc. You have to specify the particular token he wishes to transfer, and the amount you wish to transfer to each beneficiary.

### Is there a whitepaper?
Yes, it is available here https://drive.google.com/file/d/1Mr-ZUylhj9NBis4W8rmlU-avAe9ShSHP/view?usp=share_link

### How do I access the site?
The live link is hosted on https://trustee.vercel.app/


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Environment Variable

```bash
    NEXT_PUBLIC_API_KEY = Infuria id
    NEXT_PUBLIC_CHAIN_ID
    NEXT_PUBLIC_CHAIN_NAME 
    NEXT_PUBLIC_NATIVE_CURRENCY 
    NEXT_PUBLIC_NATIVE_CURRENCY_SYMBOL
    NEXT_PUBLIC_RPC_URL
    NEXT_PUBLIC_EXPLORER
    NEXT_PUBLIC_CONTRACT 
    NEXT_PUBLIC_API_ENDPOINT
```
