import { useContext } from 'react';
import { Grid, Typography } from '@mui/material'
import Head from 'next/head'
import NavBar from '../src/components/app/Navbar'
import styles from '../styles/Home.module.css'
import PaddedContainer from '../src/components/app/PaddedContainer'
import { Web3Context } from '../src/context/Web3Context';

const Home = () => {

  const connections = useContext(Web3Context)

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


        </PaddedContainer>

      </div>

    </div>
  )
}

export default Home