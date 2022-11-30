import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import TagIcon from "@mui/icons-material/Tag"
import TitleIcon from '@mui/icons-material/Title';
import NotesIcon from '@mui/icons-material/Notes';
// import TimerIcon from '@mui/icons-material/Timer';
import Beneficiary from "../../contract/Beneficiary";
import FormHelperText from "@mui/material/FormHelperText"


const Step1 = ({onDone, title,
  description,
  period,
  beneficiaryData,
  onHandleTitleChange,
  onHandlePeriodChange,
  onHandleDescriptionChange,
  onHandleAddBeneficiary,
  onHandleDeleteBeneficiary, onHandleEditBeneficiary}) => {



  const [beneficiaries, setBeneficiaries] = useState([1]);
  

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, 1])
  }


  const handleSelectPeriod = (e) => {
    onHandlePeriodChange(e.target.value)
  }

  const handleTitleChange = (e) => {
    onHandleTitleChange(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    onHandleDescriptionChange(e.target.value)
  }


  let canCreateTrust = beneficiaryData.length >= 1;


  

    return (
    <Box >
      <Grid container spacing={2} sx={{
        mb: 4
      }}>
        <Grid item xs={8}>
        <TextField
            id="outlined-multiline-flexible-title"
            label="Title"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            helperText={"Add a Title"}
            FormHelperTextProps={{
              id: "title-helper-text",
            }}
            InputLabelProps={{
              htmlFor: "outlined-multiline-flexible-title",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <TitleIcon />
                </InputAdornment>
              ),
              "aria-describedby": "title-helper-text",
            }}
          />
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth required={true}>
                <InputLabel id="period-select-label" >Trust Period</InputLabel>
                <Select  labelId="period-select-label" value={period} label="Trust Period" onChange={handleSelectPeriod}>
                  <MenuItem value={0}>5 minutes</MenuItem>
                  <MenuItem value={1}>30 minutes</MenuItem>
                  <MenuItem value={2}> 1 hour</MenuItem>
                  <MenuItem value={3}> 12 hours</MenuItem>
                  <MenuItem value={4}> 1 day</MenuItem>
                  <MenuItem value={5}> 1 week</MenuItem>
                  <MenuItem value={6}> 1 month</MenuItem>
                  <MenuItem value={7}> 3 months</MenuItem>
                  <MenuItem value={8}> 6 month</MenuItem>
                </Select>
                <FormHelperText id="period-select-label">
              {"Trust Period"}
            </FormHelperText>
              </FormControl>
        </Grid>
        <Grid item xs={12}>
        <TextField
            id="outlined-multiline-flexible"
            label="Description"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            helperText={"Add a description"}
            FormHelperTextProps={{
              id: "description-helper-text",
            }}
            InputLabelProps={{
              htmlFor: "outlined-multiline-flexible",
            }}
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
        <Typography variant="h4" sx={{
          fontSize: "1.125rem",
          mt: 0,
          mb: 4
        }}>
          {(beneficiaryData.length < 1) ? "No" : beneficiaryData.length} Added {(beneficiaryData.length <= 1) ? "Beneficiary" : "Beneficiaries"}
        </Typography>
      {(beneficiaryData.length === 0) && <Beneficiary onHandleEditBeneficiary={onHandleEditBeneficiary} onHandleAddBeneficiary={onHandleAddBeneficiary} onHandleDeleteBeneficiary={onHandleDeleteBeneficiary} /> }

{
    (beneficiaryData.length !== 0) &&  beneficiaries.map((beneficiary, index) => {
        return <Beneficiary key={index} beneficiary={beneficiaryData[index]} onHandleEditBeneficiary={onHandleEditBeneficiary} onHandleAddBeneficiary={onHandleAddBeneficiary} onHandleDeleteBeneficiary={onHandleDeleteBeneficiary} />
      })
    }
<Grid container item justifyContent={"flex-end"}>
<Button variant="contained" onClick={addBeneficiary} sx={{
        my: 2, ml: {xs: 0, sm: 2},
        width: {xs: "100%", sm: "auto"}
      }}> New Beneficiary</Button>

<Button variant="contained" onClick={() => {onDone()}} disabled={!canCreateTrust} sx={{
        my: 2, ml: {xs: 0, sm: 2},
        width: {xs: "100%", sm: "auto"}
      }}> Create Trust</Button>
</Grid>
      </Box>
      
       
    </Box>
    );
};

export default Step1;
