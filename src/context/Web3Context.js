import { createContext, useState, useEffect } from "react";
import { network } from '../libs/config';
import { useConnectWallet } from "../hooks/connect";

export const Web3Context = createContext();

export const Web3Provider = ({children}) => {

    const connections = useConnectWallet(network)

    const {chainId, accounts, changeNetwork} = connections
    const [switchChain, setSwitchChain] = useState(false)
    
    useEffect(() => {
        if (accounts) {
          if (chainId !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
            setSwitchChain(true)
          } else {
            setSwitchChain(false)
          }
        }
    
      }, [chainId, accounts, changeNetwork])


    return(
        <Web3Context.Provider value={{...connections, switchChain}}>
            {children}
        </Web3Context.Provider>
    )
    
}