import React, { useState, useContext, useEffect } from "react";
import useInput from "../../../hooks/use-input"
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Button from "@mui/material/Button";
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText,
  Grid,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { supportedTokens } from "../../../libs/data";


const Beneficiary = ({
  beneficiary = null,
}) => {

  
const isNFT = beneficiary.token.isNFT

  const beneficiaryAddress = beneficiary.beneficiaryAddress

  const contractAddress = beneficiary.token.contractAddress;

   const description = beneficiary.description

  const tokenPercent = beneficiary.token.tokenPercent;

  const tokenID = beneficiary.token.tokenID;


  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <FormControl fullWidth sx={{ width: "100%" }} >
            <InputLabel htmlFor="outlined-adornment-address">
              Beneficiary Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              aria-describedby="my-helper-text"
              value={beneficiaryAddress}
              readOnly={true}
              endAdornment={
                <IconButton aria-label="wallet" edge="end">
                  <AccountBalanceWalletOutlinedIcon />
                </IconButton>
              }
              label="Beneficiary Address"
            />
            
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth >
                <InputLabel>Asset Type</InputLabel>
                <Select value={isNFT} label="Asset Type" aria-describedby="asset-type-helper-text" readOnly={true}>
                  <MenuItem value={false}>Token</MenuItem>
                  <MenuItem value={true}>NFT</MenuItem>
                </Select>
                
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                {isNFT ? (
                  <>
                    <InputLabel> {"Contract Address"}</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-contract-address"
                      label="Contract Address"
                      aria-describedby="nft-address-helper-text"
                      readOnly={true}
                    />
                    
                  </>
                ) : (
                  <>
                    <InputLabel> {isNFT ? "NFT" : "Token"}</InputLabel>
                    <Select
                      label="Asset"
                      value={contractAddress}
                      aria-describedby="token-address-helper-text"
                      readOnly={true}
                    >
                      {supportedTokens.map((_token) => (
                        <MenuItem key={_token.symbol} value={_token.contractAddress}>
                          {_token.symbol}
                        </MenuItem>
                      ))}
                    </Select>
                    
                  </>
                )}
              </FormControl>
            </Grid>

            {isNFT ? (
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ width: "100%" }} >
                  <InputLabel htmlFor="outlined-adornment-token-id">
                    Token Id
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-token-id"
                    aria-describedby="token-id-helper-text"
                    value={tokenID}
                    readOnly={true}
                    label="Token ID"
                  />
                  
                </FormControl>
              </Grid>
            ) : (
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ width: "100%" }} >
                  <InputLabel htmlFor="outlined-adornment-percent-token">
                    % Token
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-percent-token"
                    aria-describedby="token-percent-helper-text"
                    value={tokenPercent}
                    readOnly={true}
                    label="% Token"
                  />
                  
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={6} sm={3}>
          {" "}
          Balance{" "}
        </Grid>
        <Grid item xs={6} sm={3}>
          {" "}
          Allowance{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-multiline-flexible-beneficiary-desc"
            label="Description"
            fullWidth
            value={description}
            InputLabelProps={{
              htmlFor: "outlined-multiline-flexible-beneficiary-desc",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <TagIcon />
                </InputAdornment>
              ),
              readOnly: true,
              "aria-describedby": "beneficiary-description-text",
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        justifyContent={"flex-end"}
        sx={{
          my: 2,
        }}
      >
        
       
      </Grid>
    </Box>
  );
};

export default Beneficiary;
