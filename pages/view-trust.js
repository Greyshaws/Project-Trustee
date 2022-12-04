import { Card } from "@mui/material";
import Head from "next/head";
import NavBar from "../src/components/app/Layout/Navbar";
import styles from "../styles/Home.module.css";
import PaddedContainer from "../src/components/app/PaddedContainer";
import Footer from "../src/components/app/Layout/Footer";
import ViewEditTrust from "../src/components/app/Trust/ViewEditTrust";

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
          <Card>
            <ViewEditTrust />
          </Card>
          

        </PaddedContainer>
      </main>
      <Footer />
    </>
  );
};

export default NewTrust;
