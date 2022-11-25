import React, {useState} from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import LocalizedTimePicker from "./LocalizedTimePicker"

const Step2 = ({template}) => {


    const [values, setValues] = React.useState({
        address: '',
        amount: 0,
        date: {},
        window: '',
      });



      const handleAddressChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleAmountChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleDated = (_dateData) => {
        setValues({ ...values, date: _dateData });
        setValues({ ...values, window: (_dateData.dateTimeUnix * 1000) }); 
      }
    

  return (
    <Box component="form" sx={{my: 4}} >
        <div>
        
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-address"
            aria-describedby="my-helper-text"
            value={values.address}
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
        </FormControl>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            aria-describedby="my-helper-text"
            value={values.amount}
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
        </FormControl>
        
      </div>
        <LocalizedTimePicker onDated={handleDated} />

      <Button variant="contained" sx={{my: 4}}>
        CREATE
      </Button>
    </Box>
  )
}

export default Step2