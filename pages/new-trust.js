import { Button, Card, Grid, Typography } from "@mui/material";
import Head from "next/head";
import NavBar from "../src/components/app/Layout/Navbar";
import styles from "../styles/Home.module.css";
import PaddedContainer from "../src/components/app/PaddedContainer";
import CreateTrust from "../src/components/app/Trust/CreateTrust";
import Footer from "../src/components/app/Layout/Footer";
import { useRouter } from "next/router";

const NewTrust = () => {
  const router = useRouter();

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
          <Card>
            <CreateTrust />
          </Card>
        </PaddedContainer>
      </main>
      <Footer />
    </>
  );
};

export default NewTrust;
