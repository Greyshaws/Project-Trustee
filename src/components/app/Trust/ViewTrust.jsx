import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TitleIcon from "@mui/icons-material/Title";
import NotesIcon from "@mui/icons-material/Notes";
import ViewBeneficiary from "./ViewBeneficiary";

const periodFormats = ["5 minutes", "30 munites", "1 hour", "6 hours"]

const ViewTrust = ({
    title, description, period, beneficiaryData=[]
}) => {
  return (
    <>
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
      
      <Divider />
      

      <Box  sx={{
        
        mt: 2,
      }}>
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