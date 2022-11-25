import { Button, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import NavBar from '../src/components/app/Layout/Navbar'
import styles from '../styles/Home.module.css'
import PaddedContainer from '../src/components/app/PaddedContainer'
import { useRouter } from 'next/router'

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

        <PaddedContainer>

          <Grid item container className={styles.cta}>

            <Grid container item alignItems={"center"} sm={6}>

              <div>

                <Typography className={styles.ctaHeading} variant={"h4"}> Secure your Digital Assets </Typography>

                <Typography className={styles.ctaBody}  variant={"body1"}>
                  Prevent your digital assets from being lost forever,
                  Let your loved onces inherit your digital asset
                </Typography>
              
                <Button onClick={() => router.push('/contract')} className={styles.ctaButton} variant='contained'> Create A Will </Button>

              </div>
            </Grid>


            <Grid sx={{background: "red", height: "26em"}} item sm={6}>

              
            </Grid>

          </Grid>

        </PaddedContainer>

      </div>

    </div>
  )
}

export default Home