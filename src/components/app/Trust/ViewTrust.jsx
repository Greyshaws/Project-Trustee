import React from 'react'
import Countdown from 'react-countdown';
import Box from "@mui/material/Box";
import converter, { hexToDec } from "hex2dec";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ViewBeneficiary from "./ViewBeneficiary";
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { paySubscription } from '../../../libs/contractFuctions';

const periodFormats = ["2 minutes", "5 minutes", "10 munites", "30 minutes", "1 hour", "1 day", "1 week", "1 month" ]

const ViewTrust = ({beneficiaryData=[], trust}) => {

  const [IsLoading, setIsLoading] = React.useState(false);


  if (!trust) return null

  const deadline = Number(trust[0]?._hex)// ? hexToDec(`0x${trust[0]._hex}`) : 0
  const title = trust[2]
  const description = trust[3]
  const active = trust[5]
  const period = trust[6]

  const pay = async () => {
    setIsLoading(true)
    try {
      await paySubscription()
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  console.log(deadline)


  return (
    <>
      <Box sx={{mb: 2, display: "flex",flexDirection: "row",alignItems: "flex-end",}}>

      <Typography variant="h4" sx={{
        fontSize: {xs: "1.125rem", md: "1.25rem"},
        fontWeight: "500",
      }}>
          Title: 
      </Typography>
      <Typography variant="body1" sx={{
        fontSize: {xs: "0.875rem", md: "1rem"},
        ml: 1,

      }}>
          {title ? title : "No Title"}
      </Typography>
      </Box>
      <Box sx={{
        
        mb: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
      }}>
      <Typography variant="h4" sx={{
        fontSize: {xs: "1.125rem", md: "1.25rem"},
        fontWeight: "500",
      }}>
          Description:  
      </Typography>
      <Typography variant="body1" sx={{
        fontSize: {xs: "0.875rem", md: "1rem"},
        ml: 1,

      }}>
          {description ? description : "No Description"}
      </Typography>
      </Box>
      <Box sx={{
        
        mb: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
      }}>
      <Typography variant="h4" sx={{
        fontSize: {xs: "1.125rem", md: "1.25rem"},
        fontWeight: "500",
      }}>
          Period: 
      </Typography>
      <Typography variant="body1" sx={{
        fontSize: {xs: "0.875rem", md: "1rem"},
        ml: 1,
      }}>
          {periodFormats[period]}
      </Typography>
      </Box>

      Subscribe before {`${deadline && new Date(deadline * 1000)}`} To prove you are alive 

      <Countdown date={deadline}></Countdown>

      <Grid container sx={{mt: "4px"}} >
        
        <LoadingButton
          variant="contained"
          onClick={pay}
          loading={IsLoading}
          >
    
          Subscribe
        </LoadingButton>
        
      </Grid>


      
      <Divider />
      

      <Box  sx={{mt: 2,}}>
      <Typography variant="h4" sx={{
        fontSize: {xs: "1.125rem", md: "1.25rem"},
        my: 2,
        fontWeight: "500",
      }}>
      {(beneficiaryData.length <= 1) ? "Beneficiary: " : "Beneficiaries: "}
      </Typography>
      
      <Grid container spacing={2}>
      {beneficiaryData.length !== 0 &&
        beneficiaryData.map((beneficiary, index) => {
          return (
            <ViewBeneficiary
              key={index}
              beneficiary={beneficiary}
             
            />
          );
        })}
      </Grid>
      
    </Box>
      
  </>
  )
}

export default ViewTrust