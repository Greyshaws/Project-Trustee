import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Web3Context } from "../../../context/Web3Context";

import ViewTrust from "./ViewTrust";
import { paySubscription } from "../../../libs/contractFuctions";


const ViewEditTrust = ({beneficiaryData, trust}) => {

  const { accounts } = useContext(Web3Context);

  const [isLoading, setIsLoading] = React.useState(false);


  if (!accounts) {
    return <Box sx={{
      p: 2,
      textAlign: "center",
    }}>
      <Typography variant="h3" sx={{
        fontWeight: "500",
        fontSize: {xs: "2rem", md: "2.5rem"}
      }}>
      Not connected
      </Typography>

      <Typography variant="body1" sx={{
        // fontWeight: "500",
        // fontSize: {xs: "2rem", md: "2.5rem"}
      }}>
        Connect your wallet to view your trust
      </Typography>
      
      </Box>;
  }

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        My Will
      </Typography>
        {isLoading ? <Box sx={{
          p: 4,
          textAlign: "center",
        }}>
              Loading ...
        </Box> 
          : <>
        <ViewTrust
            beneficiaryData={beneficiaryData}
            trust={trust}
          />
        </>}
      
    </Box>
  );
};

export default ViewEditTrust;

