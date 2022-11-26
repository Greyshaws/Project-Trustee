import { Button, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import NavBar from '../src/components/app/Navbar'
import styles from '../styles/Home.module.css'
import PaddedContainer from '../src/components/app/PaddedContainer'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Home = () => {

  const router = useRouter()

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

          <Grid item container>

            <Grid container item alignItems={"center"} sm={6}>

              <div>

                <Typography className={styles.heading} variant={"h4"}> Secure your Digital Assets </Typography>

                <Typography className={styles.body}  variant={"body1"}>
                  Prevent your digital assets from being lost forever,
                  Let your loved onces inherit your digital asset
                </Typography>
              
                <Button onClick={() => router.push('/contract')} className={styles.button} variant='contained'> Create A Will </Button>

              </div>
            </Grid>


            <Grid item sm={6}>

              <Image src={'/contract.png'}   width={500} height={500} alt='hero'/>
              
            </Grid>

          </Grid>

        </PaddedContainer>

        <PaddedContainer>

          Y

        </PaddedContainer>

      </div>

    </div>
  )
}

export default Home