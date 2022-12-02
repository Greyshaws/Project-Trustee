import React from 'react'
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
import TitleIcon from "@mui/icons-material/Title";
import NotesIcon from "@mui/icons-material/Notes";
import ViewBeneficiary from "./ViewBeneficiary";

const ViewTrust = ({
    title, description, period, beneficiaryData
}) => {
  return (
    <Box>
    <Grid
      container
      spacing={2}
      sx={{
        mb: 4,
      }}
    >
      <Grid item xs={8}>
        <TextField
          id="outlined-multiline-flexible-title"
          label="Title"
          fullWidth
          value={title}
          InputLabelProps={{
            htmlFor: "outlined-multiline-flexible-title",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
            readOnly: true,
            "aria-describedby": "title-helper-text",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth required={true}>
          <InputLabel id="period-select-label">Trust Period</InputLabel>
          <Select
            labelId="period-select-label"
            value={period}
            readOnly={true}
            label="Trust Period"
          >
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
          
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          fullWidth
          value={description}
          InputLabelProps={{
            htmlFor: "outlined-multiline-flexible",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <NotesIcon />
              </InputAdornment>
            ),
            readOnly: true,
            "aria-describedby": "description-helper-text",
          }}
        />
      </Grid>
    </Grid>

    <Box>
      <Typography
        variant="h4"
        sx={{
          fontSize: "1.125rem",
          mt: 0,
          mb: 4,
        }}
      >
        {beneficiaryData.length < 1 ? "No" : beneficiaryData.length} Added{" "}
        {beneficiaryData.length <= 1 ? "Beneficiary" : "Beneficiaries"}
      </Typography>
  

      {beneficiaryData.length !== 0 &&
        beneficiaryData.map((beneficiary, index) => {
          return (
            <ViewBeneficiary
              key={index}
              beneficiary={beneficiary}
             
            />
          );
        })}
     
    </Box>
  </Box>
  )
}

export default ViewTrust