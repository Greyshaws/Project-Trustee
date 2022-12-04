import React from "react"
import Head from "next/head";
import NavBar from "../src/components/app/Layout/Navbar";
// import styles from "../styles/Home.module.css";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PaddedContainer from "../src/components/app/PaddedContainer";
import Typography from "@mui/material/Typography"
import Footer from "../src/components/app/Layout/Footer";
import Faucet from "../src/components/app/Faucet";
import {mumbai} from "../src/libs/assets"

const NewTrust = () => {

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
      <NavBar />
      </header>
      
      <main className={styles.background} style={{minHeight: "100vh"}}>
        <PaddedContainer>
          <Card sx={{
            p: 2,
          }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: "500",
            textAlign: "center",
          }}>
            Faucets
          </Typography>
          <Box>
      <Grid container spacing={2}>
        {mumbai.map((faucet) => {
          return (
            <Faucet key={faucet.address} icon={faucet.icon} name={faucet.name} symbol={faucet.symbol} address={faucet.address} link={faucet.link} />
          );
        })}
      </Grid>
    </Box>
          </Card>
          

        </PaddedContainer>
      </main>
      
      <Footer />
    </>
  );
};

export default NewTrust;
