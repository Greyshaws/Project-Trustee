import React, { useState, useContext } from "react";
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
import { TrustContext } from "../../context/trust-context";

const Beneficiary = ({added=false, beneficiary}) => {
  const [isNFT, setIsNFT] = useState(false);
  const [token, setToken] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [tokenPercent, setTokenPercent] = useState(0);

  const trustCtx = useContext(TrustContext)
  const { addWorkingTrustBeneficiary,
    deleteWorkingTrustBeneficiary} = trustCtx

//   console.log(beneficiary)
  


  const assetType = (e) => {
    setIsNFT(e.target.value);
  };

  const tokenType = (e) => {
    setToken(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeleteBeneficiary = () => {
    deleteWorkingTrustBeneficiary(address)
  }

  const handleAddBeneficiary = () => {
    // address check 


    addWorkingTrustBeneficiary({
        beneficiaryAddress: address,

    token: {
          isNFT: {isNFT}, 
          tokenAddress: "ihgyftresadfghjkljhgfd",
          tokenID: "",
        },
    percent: tokenPercent,
    description: description,
    })
  }

  const getApproval = () => {
    console.log("get approval")
  }

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <FormControl fullWidth sx={{ width: "100%" }}>
            <InputLabel htmlFor="outlined-adornment-address">
              Beneficiary Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              aria-describedby="my-helper-text"
              value={address}
              onChange={handleAddressChange}
              endAdornment={
                <IconButton aria-label="wallet" edge="end">
                  <AccountBalanceWalletOutlinedIcon />
                </IconButton>
              }
              label="Beneficiary Address"
            />
            <FormHelperText id="my-helper-text">
              Your Beneficiary Address
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Asset Type</InputLabel>
                <Select value={isNFT} label="Asset Type" onChange={assetType}>
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
                      id="outlined-adornment-address"
                      label="Contract Address"
                    />
                  </>
                ) : (
                  <>
                    <InputLabel> {isNFT ? "NFT" : "Token"}</InputLabel>
                    <Select label="Asset" value={token} onChange={tokenType}>
                      <MenuItem value={"USDT Address"}>USDT</MenuItem>
                      <MenuItem value={"USDC Address "}>USDC</MenuItem>
                    </Select>
                  </>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth sx={{ width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-address">
                  {isNFT ? "Token Id" : "% Token"}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-address"
                  aria-describedby="my-helper-text"
                  //   value={beneficiaryAddress}
                  //   onChange={handleAddressChange}
                  label="Beneficiary Address"
                />
              </FormControl>
            </Grid>
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
            id="outlined-multiline-flexible"
            label="Description"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            helperText={"Add a description"}
            FormHelperTextProps={{
              id: "description-helper-text",
            }}
            InputLabelProps={{
              htmlFor: "outlined-multiline-flexible",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <TagIcon />
                </InputAdornment>
              ),
              "aria-describedby": "description-helper-text",
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
      ><Button
      variant={"outlined"}
    >
      Grant Approval
    </Button>
         <Button
          variant={"outlined"}
          sx={{
            ml: 2,
          }}
          onClick={handleAddBeneficiary }
        >
          { "Add Beneficiary"} 
        </Button>
        <Button
          variant={"outlined"}
          sx={{
            ml: 2,
          }}
          onClick={handleDeleteBeneficiary}
        >
          { "Delete Beneficiary"} 
        </Button>
      </Grid>
    </Box>
  );
};

export default Beneficiary;
