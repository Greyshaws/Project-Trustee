/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Close, ContactPageSharp, Troubleshoot } from '@mui/icons-material';
import styles from '../../../styles/Home.module.css'
import { useContext, useState, useEffect } from "react";
import { 
    Grid, FormControl, InputLabel,
    FormHelperText, OutlinedInput, CircularProgress
} from "@mui/material"

import { LoadingButton } from "@mui/lab";
import { approve, approveForTokens, getNFT } from "../../libs/functions";
import Toast from '../app/Alerts';
import axios from 'axios';
import { getNFTUrl } from '../../libs/utils';
import NFTCard from './NFTCard';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApproveNFTModal = ({title,  open, setOpen, collectionAddress, tokenId, approved}) => {

  const [tokenDetails, setTokenDetails] = useState(null);
  const [nftDetails, setNftDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [success, setSuccess] = useState(false);

  const approveNFT = async() => {
    setLoadingApprove(true)

    try {
      await approve(collectionAddress, tokenId)
      setSuccess(true)
    } catch (e) {
      console.log(e)
    }

    setLoadingApprove(false)
  }


  const getTokenDetails = async() => {
    try {
      setTokenDetails(await getNFT(collectionAddress, tokenId))
    } catch (e) {

      console.error(e)
    }

  }

  const fetchNftDetails = async() => {
    const url = getNFTUrl(tokenDetails?.tokenUri)
    setLoading(Troubleshoot)
    try {
      setNftDetails((await axios.get(url)).data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }


  const handleClose = () => {
    setOpen(false);
    setLoading(false)
    setNftDetails(null)
    setTokenDetails(null)
  };

  useEffect(() => {
    if(collectionAddress && tokenId) getTokenDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionAddress, tokenId])


  useEffect(() => {
    if(tokenDetails) fetchNftDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenDetails])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      >

      <DialogActions> <Button onClick={handleClose}> <Close /> </Button></DialogActions>

      <DialogTitle sx={{color: "#000"}}>{title}</DialogTitle>

      <DialogContent className={styles.modal}>

        <Grid item container justifyContent={"center"} sx={{width: "100%", maxWidth: "600px", marginTop: 1}}>
            
          {
            !loading ? (
              <Grid container item>
                {
                  nftDetails &&  <NFTCard nft={nftDetails} />
                }
              </Grid>
            )  :  (
              <CircularProgress />
            )     
          }

          {
            !approved && <LoadingButton sx={{marginTop: "2em"}} loading={loadingApprove} variant={"contained"} onClick={approveNFT}>Approve</LoadingButton>
          }

        </Grid>
          
      </DialogContent>

    </Dialog>
  )
}

export default ApproveNFTModal;