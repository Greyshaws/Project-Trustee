import { useContext, useState } from 'react';
import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import NavBar from '../src/components/app/Layout/Navbar'
import styles from '../styles/Home.module.css'
import PaddedContainer from '../src/components/app/PaddedContainer'
import { Web3Context } from '../src/context/Web3Context';
import TrustTemplates from '../src/components/app/Trust/TrustTemplates';
import Beneficiary from '../src/components/contract/Beneficiary';

const Home = () => {

  const connections = useContext(Web3Context)

  const [beneficiaries, setBeneficiaries] = useState([1]);

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, 1])
  }


  return (
    <div className={styles.background}>

      <div>

        <Head>
          <title></title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar /> 

        <PaddedContainer>

          <Card sx={{padding: "1.4em"}}>

          <TextField> TITLE</TextField>

          <TextField> Interval </TextField>

            {
              beneficiaries.map((beneficiary, index) => {
                return <Beneficiary beneficiary={beneficiary} key={index} />
              })
            }

            <Grid container item justifyContent={"flex-end"}> 
              <Button variant="contained" onClick={addBeneficiary}> Add Beneficiary</Button>
            </Grid>
          </Card>

        </PaddedContainer>

      </div>

    </div>
  )
}

export default Home