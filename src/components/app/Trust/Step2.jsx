import React, {useState, useContext} from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment';
import LocalizedTimePicker from "./LocalizedTimePicker"
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LiteralDatePicker from './LiteralDatePicker';
import TagIcon from '@mui/icons-material/Tag';
import {TrustContext } from "../../../context/trust-context"
import MultiBeneficiaryPicker from './MultiBeneficiaryPicker';

const Step2 = ({template, onClickedCreateTrust}) => {
    const trustCtx = useContext(TrustContext);

    const { workingTrust, updateWorkingTrust, addTrustTemplate} = trustCtx

      // console.log(template)

      const { data: { deadline: {format}} } = template

      let dateFormateIsTimePicker = (format === "year-month-day") ? false : true



      const handleAddressChange = (prop) => (event) => {
        updateWorkingTrust({ ...workingTrust, [prop]: event.target.value });
      };

      const handleAmountChange = (prop) => (event) => {
        updateWorkingTrust({ ...workingTrust, [prop]: event.target.value });
      };

      const handleDated = (_dateData) => {
        updateWorkingTrust({ ...workingTrust,  date: {..._dateData}, window: (_dateData.dateTimeUnix * 1000) });

      }

      const handleDescriptionChange = (prop) => (event) => {
        updateWorkingTrust({ ...workingTrust, [prop]: event.target.value });
      };


      const saveWorkingTrustHandler = () => {
        addTrustTemplate();
      }

      const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log("hasError Checks");

        onClickedCreateTrust();

      }

    
  return (
    <Box component="form" sx={{my: 4}} onSubmit={formSubmitHandler}>
        <div>
        <MultiBeneficiaryPicker />
        {/* <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-address"
            aria-describedby="my-helper-text"
            value={workingTrust.address}
            onChange={handleAddressChange('address')}
            endAdornment={
            <IconButton
                aria-label="wallet"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <AccountBalanceWalletOutlinedIcon />
              </IconButton>}
            label="Address"
          />
        <FormHelperText id="my-helper-text">Your Beneficiary Address</FormHelperText>
        </FormControl> */}

        {/* <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            aria-describedby="my-helper-text"
            value={workingTrust.amount}
            type="number"
            onChange={handleAmountChange('amount')}
            endAdornment={
            <IconButton
                aria-label="wallet"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <SavingsOutlinedIcon />
              </IconButton>}
            label="Amount"
          />
        <FormHelperText id="my-helper-text">Trust Amount</FormHelperText>
        </FormControl> */}
        
      </div>
        {dateFormateIsTimePicker && <LocalizedTimePicker onDated={handleDated} />}

        {!dateFormateIsTimePicker && <LiteralDatePicker onDated={handleDated} /> }

        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          required={true}
          fullWidth
          multiline
          maxRows={4}
          minRows={3}
          value={workingTrust.description}
          onChange={handleDescriptionChange('description')}
          helperText={"Add a description"}
          FormHelperTextProps={{
            id: "description-helper-text"
          }}
          InputLabelProps={{
            htmlFor: "outlined-multiline-flexible"
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <TagIcon />
              </InputAdornment>
            ),
            "aria-describedby": "description-helper-text"
          }}
        />
            
        <Stack sx={{
          display: {sm: "flex"},
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end"
        }
        }>

{/* <Button variant="outlined" sx={{my: 3, }} type="button" onClick={saveWorkingTrustHandler}>
        SAVE AS TEMPLATE
      </Button> */}
          <Button variant="contained" sx={{my: 3, ml: {sm: 2}}} type="submit">
        CREATE TRUST
      </Button>
      
        </Stack>
      
    </Box>
  )
}

export default Step2