import React, {useState} from "react"

export const TrustContext = React.createContext({
    trust: {},
    trustTemplates: {},
    updateTrust: () => {},
})

const TrustContextProvider = ({children}) => {
    const [trust, setTrust] = useState({});

    const updateTrustHandler = () => {
        console.log("update Trust")
    }


    return (
        <TrustContext.Provider value={{
            trust: trust,
            updateTrust: updateTrustHandler,
        }}>
            {children}
        </TrustContext.Provider>
    )
}


export default TrustContextProvider;