import React, { useState, useContext } from 'react';
import { Grid, Typography, Toolbar, AppBar } from '@mui/material';
import styles from '../../../styles/Nav.module.css'
import { LoadingButton } from '@mui/lab';
import { truncateAddress } from '../../libs/utils';
import SwitchNetwork from './SwitchNetwork';
import { Web3Context } from '../../context/Web3Context';
import Link from 'next/link';




const NavBar = () => {


  const {connect, loading, accounts } = useContext(Web3Context);


  return (
    <React.Fragment>
      <AppBar sx={{ padding: "0.6em", background: "#ffffff", color: "#000000"}}>
        <Toolbar>
          <Grid container>
            <Grid item xs={6}>
              <Typography LinkComponent={Link} href="/" className={styles.logo} textAlign={"left"} component="h2">
                Trustee
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid sx={{height: "100%"}} container alignItems={"center"} justifyContent={"flex-end"}>
                <LoadingButton loading={loading} onClick={connect} variant="contained">
                  { !accounts ?   "Connect" : truncateAddress(accounts) }
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        </AppBar>
      <Toolbar />
      <SwitchNetwork />
    </React.Fragment>
  )
}

export default NavBar
