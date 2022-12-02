import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Web3Context } from "../../../context/Web3Context";
import EditTrust from "./EditTrust";
import ViewTrust from "./ViewTrust";


const ViewEditTrust = ({}) => {
  const { connect, loading, accounts } = useContext(Web3Context);

  const [isEdit, setIsEdit] = useState(false);

  // trust data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState(0);
  const [beneficiaryData, setBeneficiaryData] = useState([]);

  const handleClickedEditTrust = () => {
    setIsEdit(true);
  };

  const handleUpdatedTrust = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    if (accounts) {
      console.log("fetch trust data from chain");
      // e.g
      let trust = {
        title: "One of my trusts",
        description: "This trust has a description",
        period: 0,
        beneficiaryData: [
          {
            beneficiaryAddress: "asdfghjkljhgfdsafghjklhgfd",
            description: "hello 1",
            token: {
              isNFT: false,
              contractAddress: "sadbgfbvdcsafbgdsadf",
              tokenID: "8001",
              tokenPercent: 0.2, // 20%
            },
          },

          {
            beneficiaryAddress: "asdfghjkljhgfdsafghjklhgfd",
            description: "hello 1",
            token: {
              isNFT: false,
              contractAddress: "sadbgfbvdcsafbgdsadf",
              tokenID: "8001",
              tokenPercent: 0.92, // 92%
            },
          },
        ],
      };

      let trustFormated = {
        ...trust,
        beneficiaryData: trust.beneficiaryData.map((beneficiary) => {
          return {
            ...beneficiary,
            token: {
              ...beneficiary.token,
              tokenPercent: `${beneficiary.token.tokenPercent * 100}%`,
            },
            state: {
              saved: true,
              added: true,
            },
          };
        }),
      };
      setTitle(trustFormated.title);
      setDescription(trustFormated.description);
      setPeriod(trustFormated.period);
      setBeneficiaryData(trustFormated.beneficiaryData);
    }
  }, [accounts]);

  if (!accounts) {
    return <Box>Not connected</Box>;
  }

  return (
    <>
    <Typography variant="h2" component="h1" gutterBottom>
            {isEdit ? "Edit Trust" : "My Trust"}
          </Typography>
      {!isEdit ? (
        <>
        
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
                handleClickedEditTrust();
              }}
              sx={{
                my: 2,
                ml: { xs: 0, sm: 2 },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {" "}
              Edit Trust
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <EditTrust
            onUpdatedTrust={handleUpdatedTrust}
            savedTitle={title}
            savedDescription={description}
            savedPeriod={period}
            savedBeneficiaryData={beneficiaryData}
          />
        </>
      )}
    </>
  );
};

export default ViewEditTrust;
