import React, {useState} from "react"


import dayjs from "dayjs";
import AdbIcon from "@mui/icons-material/Adb";

/*
beneficiaryData = [
  {
    address: "khjgfcdxgchjklhvg",

    token: {
          type: "token", //token or nft
          tokenAddress: "ihgyftresadfghjkljhgfd",
        },
    percent: 0.3,
  }
]
*/


export const TrustContext = React.createContext({
    workingTrust: {},
    createTrust: () => {},
    updateWorkingTrust: () => {},
    addWorkingTrustBeneficiary: () => {},
    deleteWorkingTrustBeneficiary: () => {}
})



const TrustContextProvider = ({children}) => {
  const [workingTrust, setWorkingTrust] = useState({
        beneficiaryData: [],
        window: '',
        description: '',
  })

    const createTrustHandler = () => {
        console.log("creating Trust")
    }


    const updateWorkingTrustHandler = (_trust) => {
      setWorkingTrust(_trust)
    }

    const addWorkingTrustBeneficiaryHandler = (_newBeneficiary) => {
      let beneficiaryAlreadyExists = workingTrust.beneficiaryData.filter(ben => {
        return ben.beneficiaryAddress === _newBeneficiary.beneficiaryAddress
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
        return ben.beneficiaryAddress !== _address
      })

      // console.log("item: ", updatedBeneficiaries)

      updateWorkingTrustHandler({...workingTrust, 
        beneficiaryData: [
            ...updatedBeneficiaries
          ]
        })

    }

    return (
        <TrustContext.Provider value={{
            workingTrust: workingTrust,
            createTrust: createTrustHandler,
            updateWorkingTrust: updateWorkingTrustHandler,
            addWorkingTrustBeneficiary: addWorkingTrustBeneficiaryHandler,
            deleteWorkingTrustBeneficiary: deleteWorkingTrustBeneficiaryHandler,

        }}>
            {children}
        </TrustContext.Provider>
    )
}


export default TrustContextProvider;