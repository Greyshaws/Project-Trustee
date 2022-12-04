import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { ethers } from "ethers";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Web3Context } from "../../../context/Web3Context";
import { hexToDec } from "hex2dec";



const ViewBeneficiary = ({ beneficiary}) => {
  const { accounts } = useContext(Web3Context);

  const isNFT = beneficiary[0];

  const value = hexToDec(beneficiary[1]._hex);

  const description = beneficiary[2];

  const beneficiaryAddress = beneficiary[3];

  const contractAddress = beneficiary[4];

  if (!isNFT) {

    return (
      <Grid item xs={12} md={6}>
        <Box sx={{mb: 2,}}>
          <Typography
            variant="body1"
            sx={{fontSize: { xs: "0.875rem", md: "1rem" },}}>
            <b>Beneficiary Address:</b> {beneficiaryAddress}
          </Typography>
          <Typography
            variant="body1"
            sx={{fontSize: { xs: "0.875rem", md: "1rem" }}}>
            <b>Asset Type:</b> Token
          </Typography>
          <Typography
            variant="body1"
            sx={{fontSize: { xs: "0.875rem", md: "1rem" }}}>
            <b>Token:</b> {value} %
          </Typography>

          <Typography
            variant="body1"
            sx={{fontSize: { xs: "0.875rem", md: "1rem" }}}>
            <b>Description:</b> {description ? description : "none"}
          </Typography>
          {/* <Typography
            variant="body2"
            sx={{fontSize: { xs: "0.75rem", md: "0.8em" },mt: 2,}}>
            Note: The address, {beneficiaryAddress} will recieve {value}{"%"}
            {contractAddress} from your {contractAddress} balance in {accounts}, if
            the period is completed without you interacting with this contract. 
          </Typography> */}
        </Box>
        <Divider />
      </Grid>
    );
  }

  return (
    <Grid item xs={12} md={6}>
      <Box sx={{mb: 2}}>
        <Typography
          variant="body1"
          sx={{fontSize: { xs: "0.875rem", md: "1rem" },}}
        >
          <b>Beneficiary Address:</b> {beneficiaryAddress}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          <b>Asset Type:</b> NFT
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          <b>Contract Address:</b> {contractAddress}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          <b>Token ID:</b> {value}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          <b>Description:</b> {description ? description : "none"}
        </Typography>
        {/* <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.75rem", md: "0.8rem" },
            mt: 2,
          }}
        >
          Note: The address, {beneficiaryAddress} will recieve the NFT with
          contractAddress {contractAddress} and token ID {tokenID} from{" "}
          {accounts}, if the period is completed without you interacting
          with this contract.
        </Typography> */}
      </Box>
      <Divider />
    </Grid>
  );
};

export default ViewBeneficiary;
