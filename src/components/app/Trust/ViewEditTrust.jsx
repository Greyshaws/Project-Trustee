import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Web3Context } from "../../../context/Web3Context";
// import EditTrust from "./EditTrust";
import ViewTrust from "./ViewTrust";
import { getMyTrust } from "../../../libs/contractFuctions";

const ViewEditTrust = ({beneficiaryData}) => {
  const { accounts } = useContext(Web3Context);

  const [isLoading, setIsLoading] = useState(false);

  // trust data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState(0);


  const handleInteract = async () => {
    console.log("interacted");
    if (accounts) {
      setIsLoading(true);
      const response = await getMyTrust()
        .then((data) => data)
        .catch((err) => console.log(err));
        setIsLoading(false);
      console.log(response);
    }
  };

  console.log(accounts);

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
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        My Trust
      </Typography>
        {isLoading ? <Box sx={{
          p: 4,
          textAlign: "center",
        }}>
              Loading ...
        </Box> 
          : <>
        <ViewTrust
        title={title}
        description={description}
        period={period}
        beneficiaryData={beneficiaryData}
      />
      <Grid container item justifyContent={"flex-end"}>
        
        <Button
          variant="contained"
          onClick={() => {
            handleInteract();
          }}
          sx={{
            my: 2,
            ml: { xs: 0, sm: 2 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {" "}
          INTERACT WITH CONTRACT
        </Button>
      </Grid>
        </>}
      
    </Box>
  );
};

export default ViewEditTrust;

