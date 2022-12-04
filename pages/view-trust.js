import { useState, useEffect, useContext } from "react";
import { Card } from "@mui/material";
import Head from "next/head";
import NavBar from "../src/components/app/Layout/Navbar";
import styles from "../styles/Home.module.css";
import PaddedContainer from "../src/components/app/PaddedContainer";
import Footer from "../src/components/app/Layout/Footer";
import ViewEditTrust from "../src/components/app/Trust/ViewEditTrust";
import { getMyTrust, getMyTrustBeneficiaries } from "../src/libs/contractFuctions";
import PleaseLogin from "../src/components/app/PleaseLogin";
import { Web3Context } from "../src/context/Web3Context";

const NewTrust = () => {

  const [beneficiaries, setBeneficiaries] =  useState([]);
  const [trust, setTrust] =  useState([]);

  const getWill = async ( ) => {
    try {
      setTrust(await getMyTrust())
      setBeneficiaries(await getMyTrustBeneficiaries())
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getWill()
  }, []);

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
            <ViewEditTrust beneficiaryData={beneficiaries} trust={trust} />
          </Card>
        </PaddedContainer>
      </main>
      <Footer />
    </>
  );
};

export default NewTrust;
