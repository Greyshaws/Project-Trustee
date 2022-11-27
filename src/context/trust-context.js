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
          type: "single", // single or multi
          beneficiaryData: { address: "oxjkkbhxcvbnliytdretxcvbnkjhdsdfvb", amount: 100 }, // string or array
        },
        amount: 100,
        deadline: {
          format: "year-month-day",
          date: dayjs.unix(dayjs("2022-04-07")).unix(),
        },
        description: "This is a Trust",
      },
      
      
      isNFT: false,
    },
    {
      id: "temp2",
      title: "Date and Day",
      icon: <AdbIcon />,
      data: {
        beneficiary: {
          type: "single",
          beneficiaryData: { address: "oxjkkbhxcvbnliytdretxcvbnkjhdsdfvb", amount: 100},
        },
        amount: 100,
        deadline: {
          format: "year-month-day",
          date: dayjs.unix(dayjs("2022-04-07")).unix(),
        },
        description: "This is a Trust",
      },
      isNFT: false,
    },
    {
      id: "temp3",
      title: "Default With NFTs",
      icon: <AdbIcon />,
      data: {
        beneficiary: {
          type: "single",
          beneficiaryData: { address: "oxjkkbhxcvbnliytdretxcvbnkjhdsdfvb", amount: 100},
        },
        amount: 100,
        deadline: {
          format: "year-month-day",
          date: dayjs.unix(dayjs("2022-04-07")).unix(),
        },
        description: "This is a Trust",
      },
      isNFT: false,
    },
  ];

export const TrustContext = React.createContext({
    workingTrust: {},
    trustTemplates: [],
    createTrust: () => {},
    addTrustTemplate: () => {},
    updateWorkingTrust: () => {},
    addWorkingTrustBeneficiary: () => {},
    deleteWorkingTrustBeneficiary: () => {}
})



const TrustContextProvider = ({children}) => {
  const [workingTrust, setWorkingTrust] = useState({
        beneficiaryData: [],
        amount: 0,
        date: {},
        window: '',
        description: '',
  })
    const [trustTemplates, setTrustTemplates] =useState(DEFAULT_TRUST_TEMPS)

    const createTrustHandler = () => {
        console.log("creating Trust")
    }

    const addTrustTemplateHandler = (_newTemplate) => {
        console.log("saved trust template")
        // setTrustTemplates((prevTemps) => [...prevTemps, _newTemplate])
    }

    const updateWorkingTrustHandler = (_trust) => {
      setWorkingTrust(_trust)
    }

    const addWorkingTrustBeneficiaryHandler = (_newBeneficiary) => {
      let beneficiaryAlreadyExists = workingTrust.beneficiaryData.filter(ben => {
        return ben.address === _newBeneficiary.address
      }).length > 0

      if (beneficiaryAlreadyExists) {
        console.log("ben already exists")
        return
      }


      updateWorkingTrustHandler({
        ...workingTrust, 
        beneficiaryData:  [
            ...workingTrust.beneficiaryData,
            _newBeneficiary
        ]
      })
      console.log("added working trust beneficiary")
    }

    const deleteWorkingTrustBeneficiaryHandler = (_address) => {
      let beneficiaries = [...workingTrust.beneficiaryData]

      let updatedBeneficiaries = beneficiaries.filter((ben) => {
        return ben.address !== _address
      })

      updateWorkingTrustHandler({...workingTrust, 
        beneficiaryData: [
            ...updatedBeneficiaries
          ]
        })

    }

    return (
        <TrustContext.Provider value={{
            workingTrust: workingTrust,
            trustTemplates: trustTemplates,
            createTrust: createTrustHandler,
            addTrustTemplate: addTrustTemplateHandler,
            updateWorkingTrust: updateWorkingTrustHandler,
            addWorkingTrustBeneficiary: addWorkingTrustBeneficiaryHandler,
            deleteWorkingTrustBeneficiary: deleteWorkingTrustBeneficiaryHandler,

        }}>
            {children}
        </TrustContext.Provider>
    )
}


export default TrustContextProvider;