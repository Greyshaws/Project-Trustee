import React, {useState} from "react"


import dayjs from "dayjs";
import AdbIcon from "@mui/icons-material/Adb";

const DEFAULT_TRUST_TEMPS = [
    {
      id: "temp1",
      title: "Default Date and Amount",
      icon: <AdbIcon />,
      data: {
        beneficiary: {
          type: "single",
          address: "oxjkkbhxcvbnliytdretxcvbnkjhdsdfvb",
        },
        amount: 100,
        date: dayjs.unix(dayjs("2022-04-07")).unix(),
      },
    },
    {
      id: "temp2",
      title: "Date and Day",
      icon: <AdbIcon />,
      data: {
        beneficiary: {
          type: "single",
          address: "oxjkkbhxcvbnliytdretxcvbnkjhdsdfvb",
        },
        amount: 100,
        date: dayjs.unix(dayjs("2022-04-07")).unix(),
      },
    },
    {
      id: "temp3",
      title: "Default With NFTs",
      icon: <AdbIcon />,
      data: {
        beneficiary: {
          type: "single",
          address: "oxjkkbhxcvbnliytdretxcvbnkjhdsdfvb",
        },
        amount: 100,
        date: dayjs.unix(dayjs("2022-04-07")).unix(),
      },
    },
  ];

export const TrustContext = React.createContext({
    
    trustTemplates: [],
    createTrust: () => {},
    addTrustTemplate: () => {},
})



const TrustContextProvider = ({children}) => {
    const [trustTemplates, setTrustTemplates] =useState(DEFAULT_TRUST_TEMPS)

    const createTrustHandler = () => {
        console.log("create Trust")
    }

    const addTrustTemplateHandler = (_newTemp) => {
        setTrustTemplates((prevTemps) => [...prevTemps, _newTemp])
    }

    return (
        <TrustContext.Provider value={{
            trustTemplates: trustTemplates,
            createTrust: createTrustHandler,
            addTrustTemplate: addTrustTemplateHandler,

        }}>
            {children}
        </TrustContext.Provider>
    )
}


export default TrustContextProvider;