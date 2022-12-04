import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Close } from '@mui/icons-material';
import styles from '../../../styles/Home.module.css'

import { useContext, useState } from "react";
import { 
  Grid, FormControl, InputLabel, OutlinedInput, Alert
} from "@mui/material"

import { LoadingButton } from "@mui/lab";
import { approveForTokens } from "../../libs/functions";
import Toast from '../app/Alerts';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApproveTokenModal = ({title,  open, setOpen, token, allowance}) => {


  const [amount, setAmount] = useState(allowance === 0 ? null : allowance);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const approve = async() => {
    setLoading(true)

    try {
      await approveForTokens(token.address, amount)
      setAmount(amount)
      setSuccess(true)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }


  const handleClose = () => {
    setOpen(false);
    setAmount(allowance === 0 ? null : allowance)
    setLoading(false)
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      >

      <DialogActions> <Button onClick={handleClose}> <Close /> </Button></DialogActions>

      <DialogTitle textAlign={"center"} sx={{color: "#000"}}>{title}</DialogTitle>

      <Alert sx={{marginLeft: "2em", marginRight: "2em"}} severity='info'> You should grant us Allowance greater than your Future Balance</Alert>

      <DialogContent className={styles.modal}>

        <Grid item container justifyContent={"center"} sx={{width: "100%", maxWidth: "600px", marginTop: 1}}>
          
          <FormControl fullWidth sx={{ width: "100%" }}>

            <InputLabel> Amount </InputLabel>

            <OutlinedInput disabled={loading} label="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

          </FormControl>

          <LoadingButton sx={{marginTop: "2em"}} loading={loading} variant={"contained"} onClick={approve}>Approve</LoadingButton>

        </Grid>
          
      </DialogContent>

      <Toast message={"Successful"} open={success} setOpen={setSuccess} />

    </Dialog>
  )
}

export default ApproveTokenModal