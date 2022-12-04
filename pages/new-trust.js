import { useContext } from "react";
import { Card  } from "@mui/material";
import Head from "next/head";
import NavBar from "../src/components/app/Layout/Navbar";
import styles from "../styles/Home.module.css";
import PaddedContainer from "../src/components/app/PaddedContainer";
import CreateTrust from "../src/components/app/Trust/CreateTrust";
import Footer from "../src/components/app/Layout/Footer";
import { useRouter } from "next/router";
import PleaseLogin from "../src/components/app/PleaseLogin";
import { Web3Context } from "../src/context/Web3Context";

const NewTrust = () => {

  const { accounts, connect } = useContext(Web3Context);

  if (!accounts) return (<PleaseLogin connect={connect}  />)

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
