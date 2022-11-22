import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { network } from '../../libs/config';
import { Web3Context } from '../../context/Web3Context';

export default function SwitchNetwork () {

  const { changeNetwork, switchChain } = useContext(Web3Context);
  const [open, setOpen] = useState(switchChain);
  
  const handleClick = async () => {
    changeNetwork(network)
  };

  const handleClose = () => {
    setOpen(false)
    console.warn("Tried to close without Switching")
  };

  return (
    <div>
      <Dialog
        open={switchChain}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{color: "#000000"}}>
          {"Switch Network"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your are on the wrong Network, switch to the {process.env.NEXT_PUBLIC_CHAIN_NAME}, to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClick}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
