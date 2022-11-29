import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Beneficiary from "../../contract/Beneficiary";
import { TrustContext } from "../../../context/trust-context";


const Step1 = () => {



  const [beneficiaries, setBeneficiaries] = useState([1]);

  
  
  const trustCtx = useContext(TrustContext);

  const {workingTrust, addWorkingTrustBeneficiary} = trustCtx

  const {beneficiaryData} = workingTrust

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, 1])
  }

  const addBeneficiaryDataHandler = (_beneficiary) => {
    addWorkingTrustBeneficiary(_beneficiary)
  }


    return (
    <Box>
      {(beneficiaryData.length === 0) && <Beneficiary /> }

        {
            (beneficiaryData.length !== 0) &&  beneficiaries.map((beneficiary, index) => {
                return <Beneficiary key={index} beneficiary={beneficiaryData[index]} />
              })
            }
      <Grid container item justifyContent={"flex-end"}>
        <Button variant="contained" onClick={addBeneficiary} sx={{
                ml: 2
              }}> Add Beneficiary</Button>
      </Grid>
       
    </Box>
    );
};

export default Step1;
