import { Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import NavBar from "../src/components/app/Layout/Navbar";
import styles from "../styles/Home.module.css";
import PaddedContainer from "../src/components/app/PaddedContainer";
import Footer from "../src/components/app/Layout/Footer";
import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main >
        <PaddedContainer>
          <Typography variant="h2" component="h1" gutterBottom>
            About Trustee
          </Typography>

          
        </PaddedContainer>
      </main>
      <Footer />
    </>
  );
};

export default About;
