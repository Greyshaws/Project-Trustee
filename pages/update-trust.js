import "../src/libs/contract_abi.json";
import { Contract, providers, Signer, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TagIcon from "@mui/icons-material/Tag";
import TitleIcon from "@mui/icons-material/Title";
import NotesIcon from "@mui/icons-material/Notes";
// import TimerIcon from '@mui/icons-material/Timer';
import Beneficiary from "../src/components/contract/Beneficiary";
import FormHelperText from "@mui/material/FormHelperText";
import { updateMyTrustBeneficiaries } from "../src/libs/contractFuctions";

const UpdateTrust = () => {
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [indexes, setIndexes] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([{}]);
  const [beneficiaryData, setBeneficiaryData] = useState([{}]);
  const [beneficiaryErrorsData, setBeneficiaryErrorsData] = useState([false]);

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, {}]);
    setBeneficiaryData([...beneficiaryData, {}]);
    setBeneficiaryErrorsData([...beneficiaryErrorsData, false]);
  };

  const handleSelectPeriod = (e) => {
    setPeriod(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditBeneficiary = (index, value, error) => {
    const temp = [...beneficiaryData];
    temp[index] = value;
    setBeneficiaryData(temp);

    const temps = [...beneficiaryErrorsData];
    temps[index] = error;
    setBeneficiaryErrorsData(temps);
  };

  const hasError = () => {
    if (period == null) return true;

    return false;
  };

  const update = async () => {
    try {
      setIndexes(beneficiaryData?.length);
      await updateMyTrustBeneficiaries(indexes, beneficiaryData);
    } catch (e) {
      console.log(e);
    }
  };

  const anyError = () => {
    for (let i = 0; i < beneficiaryErrorsData.length; i++) {
      if (beneficiaryErrorsData[i]) return true;
    }

    return false;
  };

  return (
    <Box>
      <Typography
        sx={{ padding: 3 }}
        variant="h4"
        textAlign={"center"}
        component="h1"
        gutterBottom
      >
        {" "}
        Update your Trust{" "}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={8}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            helperText={"Add a Title"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <TitleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth required={true}>
            <InputLabel id="period-select-label">Trust Period</InputLabel>
            <Select
              labelId="period-select-label"
              value={period}
              label="Trust Period"
              onChange={handleSelectPeriod}
            >
              <MenuItem value={0}>2 minutes</MenuItem>
              <MenuItem value={1}>5 minutes</MenuItem>
              <MenuItem value={2}>10 minutes</MenuItem>
              <MenuItem value={3}>30 minutes</MenuItem>
              <MenuItem value={4}> 1 hour</MenuItem>
              <MenuItem value={5}> 1 day</MenuItem>
              <MenuItem value={6}> 1 week</MenuItem>
              <MenuItem value={7}> 1 month</MenuItem>
              {/* <MenuItem value={9}> 3 months</MenuItem>
                <MenuItem value={10}> 6 month</MenuItem> */}
            </Select>
            <FormHelperText>{"Trust Period"}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            helperText={"Add a description"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <NotesIcon />
                </InputAdornment>
              ),
              "aria-describedby": "description-helper-text",
            }}
          />
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h4" sx={{ fontSize: "1.125rem", mt: 0, mb: 4 }}>
          {beneficiaryData?.length < 1 ? "No" : beneficiaryData?.length}Added{" "}
          {beneficiaryData?.length <= 1 ? "Beneficiary" : "Beneficiaries"}
        </Typography>

        {beneficiaries.map((beneficiary, index) => {
          return (
            <Beneficiary
              key={index}
              beneficiary={beneficiary}
              errors={beneficiaryErrorsData}
              handleError={beneficiaryErrorsData}
              handleEditBeneficiary={handleEditBeneficiary}
              index={index}
            />
          );
        })}

        <Grid container item justifyContent={"flex-end"}>
          <Button
            variant="contained"
            onClick={addBeneficiary}
            sx={{
              my: 2,
              ml: { xs: 0, sm: 2 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {" "}
            Add Beneficiary
          </Button>

          <Button
            variant="contained"
            onClick={update}
            disabled={anyError()}
            sx={{
              my: 2,
              ml: { xs: 0, sm: 2 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {" "}
            Update Trust
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateTrust;
