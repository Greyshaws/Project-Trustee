import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { network } from '../../libs/config';
import { Web3Context } from '../../context/Web3Context';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

export default function PleaseLogin ({connect}) {

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const makeConnect = async () => {
    setLoading(true)
    try {
      await connect()
    } catch (e) {

    }
    setLoading(false)
  }

  return (
    <div>
      <Dialog
        open={!loading}
        onClose={() => console.warn("Abeg Login")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{color: "#000000"}}>
            Please Connect Your Wallet
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This Page Requires you to Connect to Metamasks please do that or go back
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("/")}>Go Back To HomePage</Button>
          <LoadingButton onClick={makeConnect}>
            Connect
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
