/* eslint-disable @next/next/no-img-element */
import React, { useState } from  'react';
import VizSensor from 'react-visibility-sensor';
import { Button, Grid, Typography, Card, Fade, Slide, Zoom } from '@mui/material'
import Head from 'next/head'
import NavBar from '../src/components/app/Layout/Navbar'
import styles from '../styles/Home.module.css'
import PaddedContainer from '../src/components/app/PaddedContainer'
import { useRouter } from 'next/router'
import ProductCard from '../src/components/home/ProductCard';
import Footer from '../src/components/app/Layout/Footer';



const Home = () => {

  const router = useRouter()
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isProductVisible, setIsProductVisble] = useState(false);


  const heroAction = (isVisible) => {
    setIsHeroVisible(isVisible)
    setIsHeroVisible(true)
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

        <PaddedContainer className={styles.hero_section}>

          <VizSensor onChange={heroAction}>

            <Grid item container>

              <Grid container item alignItems={"center"} sm={6}>

                <Fade in={isHeroVisible}>

                  <div>
                 
                    <Typography className={styles.heading} variant={"h4"}> Secure your Digital Assets </Typography>

                    <Typography className={styles.body}  variant={"body1"}>
                      Prevent your digital assets from being lost forever,
                      Let your loved ones inherit your digital asset
                    </Typography>
                  
                    <Button onClick={() => router.push('/new-trust')} className={styles.button} variant='contained'> Create A Will </Button>
                  
                  </div>

                </Fade>

              </Grid>

              <Grid item sm={6}>
                <Fade in={isHeroVisible}>
                  <img src={'/contract.png'}   width={"100%"} alt='hero'/>
                </Fade>
              </Grid>

            </Grid>

          </VizSensor>

        </PaddedContainer>

        <PaddedContainer className={styles.product}>

          <VizSensor onChange={heroAction}>

            <Grid container item spacing={4}>

              <Grid item container justifyContent={"center"}>
                <Typography sx={{color: "white"}} variant='h4' textAlign={"center"}>Secure Your Digital Assets On Polygon</Typography>
              </Grid>

              <ProductCard image={'/tokens.png'} />

              <ProductCard image={'/nft-card.png'} />

              <ProductCard image={'/tokens.png'} />

              <ProductCard image={'/nft-card.png'} />

            </Grid>

          </VizSensor>

        </PaddedContainer>

        <PaddedContainer className={styles.call_to_action}>

          <Grid item container>

            <Grid container item alignItems={"center"} sm={6}>

              <div>

                <Typography className={styles.heading} variant={"h4"}> Your Beneficiaries will get credit once this Contract is activated </Typography>

                <Button onClick={() => router.push('/new-trust')} className={styles.button} variant='contained'> Create Will Now </Button>

              </div>
            </Grid>

          </Grid>

        </PaddedContainer>

      </div>

      <Footer />

    </div>
  )
}

export default Home