import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import LocalizedTimePicker from "./LocalizedTimePicker";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LiteralDatePicker from "./LiteralDatePicker";
import TagIcon from "@mui/icons-material/Tag";
import { TrustContext } from "../../../context/trust-context";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PercentIcon from '@mui/icons-material/Percent';

const MultiBeneficiaryPicker = () => {
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [beneficiaryPercent, setBeneficiaryPercent] = useState("");

  const trustCtx = useContext(TrustContext);
  const {
    workingTrust: {
      beneficiaryData,
    },
    addWorkingTrustBeneficiary,
    deleteWorkingTrustBeneficiary,
  } = trustCtx;

  const handleAddressChange = (event) => {
    setBeneficiaryAddress(event.target.value);
  };

  const handlePercentChange = (event) => {
    setBeneficiaryPercent(event.target.value);
  };

  const addNewBeneficiaryAddress = () => {
    if (beneficiaryAddress.trim().length === 0) {
      // error invalid address
      return;
    }

    if (beneficiaryPercent <= 0 || beneficiaryPercent > 100) {
      // error invalid percent
      return;
    }

    let beneficiaryAlreadyExists = beneficiaryData.filter(ben => {
      return ben.address === beneficiaryAddress
    }).length > 0

    if (beneficiaryAlreadyExists) {
      console.log("ben already exists")
      return
    }

    addWorkingTrustBeneficiary({
      address: beneficiaryAddress,
      percent: beneficiaryPercent,
    });

    setBeneficiaryAddress('')
    setBeneficiaryPercent('')
  };

  const deleteNewBeneficiaryAddress = (_address) => {
    deleteWorkingTrustBeneficiary(_address)
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor="outlined-adornment-address">
              Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              aria-describedby="my-helper-text"
              value={beneficiaryAddress}
              onChange={handleAddressChange}
              endAdornment={
                <IconButton
                  aria-label="wallet"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <AccountBalanceWalletOutlinedIcon />
                </IconButton>
              }
              label="Address"
            />
            <FormHelperText id="my-helper-text">
              Your Beneficiary Address
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor="outlined-adornment-percent">
                Percent
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-percent"
                aria-describedby="my-helper-text"
                value={beneficiaryPercent}
                type="number"
                onChange={handlePercentChange}
                endAdornment={
                  <IconButton
                    aria-label="percent"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <PercentIcon />
                  </IconButton>
                }
                label="Percent"
              />
              <FormHelperText id="my-helper-text">Trust percent</FormHelperText>
            </FormControl>

            <Box>
              <IconButton
                variant="outlined"
                sx={{
                  border: 1,
                  borderColor: "rgba(0,0,0,0.22)",
                  borderRadius: 3,
                  ml: 2,
                }}
                size="large"
                onClick={addNewBeneficiaryAddress}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{
                  mb: 4
                }}>
        <Accordion variant="outlined">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >{(beneficiaryData.length > 1) ? `${beneficiaryData.length} Beneficiaries` : `${beneficiaryData.length} Beneficiary`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {beneficiaryData.map((beneficiary, index) => {
              return (
                <Box key={index} >
                  <Grid container spacing={7}>
                    <Grid item md={6}>
                      <Paper sx={{
                  p: 1
                }}>
                        <Typography variant="body1">
                          {beneficiary.address}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item md={3}>
                      <Paper sx={{
                  p: 1
                }}>
                        <Typography variant="body1">
                          {beneficiary.percent}%
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item md={2}>
                    <Box>
              <IconButton
                variant="outlined"
                sx={{
                  border: 1,
                  borderColor: "rgba(0,0,0,0.22)",
                  borderRadius: 3,
                  ml: 2,
                }}
                size="small"
                onClick={() => {deleteNewBeneficiaryAddress(beneficiary.address)}}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default MultiBeneficiaryPicker;
