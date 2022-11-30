import React, { useState, useContext, useEffect } from "react";
import useInput from "../../hooks/use-input"
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
import { supportedTokens } from "../../libs/data";


const Beneficiary = ({
  beneficiary = null,
  onHandleAddBeneficiary,
  onHandleDeleteBeneficiary,
  onHandleEditBeneficiary
}) => {

  

  const {
    value: isNFT,
    isValid: isNFTIsValid,
    hasError: isNFTHasError,
    valueChangeHandler: isNFTChangeHandler,
    inputBlurHandler: isNFTBlurHandler,
    reset: isNFTResetHandler,
  } = useInput((value) => true, (!!beneficiary ? beneficiary.token.isNFT : false));

  const {
    value: beneficiaryAddress,
    isValid: beneficiaryAddressIsValid,
    hasError: beneficiaryAddressHasError,
    valueChangeHandler: beneficiaryAddressChangeHandler,
    inputBlurHandler: beneficiaryAddressBlurHandler,
    reset: beneficiaryAddressResetHandler,
  } = useInput((value) => {
    let addressReg = /[a-zA-Z]+/
    // return (value.trim().length >= "") && (addressReg.test(value))
    return true
  }, (!!beneficiary ? beneficiary.beneficiaryAddress : ""));

  const {
    value: contractAddress,
    isValid: contractAddressIsValid,
    hasError: contractAddressHasError,
    valueChangeHandler: contractAddressChangeHandler,
    inputBlurHandler: contractAddressBlurHandler,
    reset: contractAddressResetHandler,
  } = useInput((value) => value.trim() !== "", (!!beneficiary ? beneficiary.token.contractAddress : ""));

   const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: descriptionResetHandler,
  } = useInput((value) => true, (!!beneficiary ? beneficiary.description : ""));

  const {
    value: tokenPercent,
    isValid: tokenPercentIsValid,
    hasError: tokenPercentHasError,
    valueChangeHandler: tokenPercentChangeHandler,
    inputBlurHandler: tokenPercentBlurHandler,
    reset: tokenPercentResetHandler,
  } = useInput((value) => {

    let newValue = value.replace("%", "") + "%"
    let percentRegex = /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/

    return percentRegex.test(newValue)

  }, (!!beneficiary ? beneficiary.token.tokenPercent : ""));

  const {
    value: tokenID,
    isValid: tokenIDIsValid,
    hasError: tokenIDHasError,
    valueChangeHandler: tokenIDChangeHandler,
    inputBlurHandler: tokenIDBlurHandler,
    reset: tokenIDResetHandler,
  } = useInput((value) => (isNFT ? (value.trim() !== "") : true), (!!beneficiary ? beneficiary.token.tokenID : ""));




  const [saved, setSaved] = useState(
    !!beneficiary ? beneficiary.state.saved : false
  );
  const [added, setAdded] = useState(
    !!beneficiary ? beneficiary.state.added : false
  );

  const [approved, setApproved] = useState(false);


  const isEditing = (saved === false) && (added === true)

 

  
    /* This useEffect hook updates the UI to know when someone is editing or not */
  useEffect(() => {
    const valuesAreEqualToSavedBeneficiary = () => {
      if (!!beneficiary === false) {
        return false
      }
      let isNFTIsSame = isNFT === beneficiary.token.isNFT
      let contractAddressIsSame = contractAddress === beneficiary.token.contractAddress
      let tokenPercentIsSame =  tokenPercent === beneficiary.token.tokenPercent
       let beneficiaryAddressIsSame = beneficiaryAddress === beneficiary.beneficiaryAddress
       let tokenIDIsSame = tokenID === beneficiary.token.tokenID
       let descriptionIsSame = description === beneficiary.description
  
      // console.log("red:, ", (isNFTIsSame && contractAddressIsSame && tokenPercentIsSame && beneficiaryAddressIsSame && tokenIDIsSame && descriptionIsSame))
       return (isNFTIsSame && contractAddressIsSame && tokenPercentIsSame && beneficiaryAddressIsSame && tokenIDIsSame && descriptionIsSame)
    }
    setSaved(valuesAreEqualToSavedBeneficiary())
  }, [isNFT, description, contractAddress, tokenPercent, beneficiaryAddress, tokenID, beneficiary])
  

  let formIsValid = false;

  if (isNFTIsValid && beneficiaryAddressIsValid && tokenIDIsValid && tokenPercentIsValid && descriptionIsValid && contractAddressIsValid) {
    formIsValid = true;
  }

  let formHasError = false

  if (isNFTHasError || beneficiaryAddressHasError || tokenIDHasError || tokenPercentHasError || descriptionHasError || contractAddressHasError) {
    formHasError = true;
  }

  
  // console.log(formIsValid, formHasError)


  const handleDeleteBeneficiary = () => {
    onHandleDeleteBeneficiary(beneficiaryAddress);
  };

  const handleAddBeneficiary = () => {
    
    if (!formIsValid || formHasError) {
      return;
    }

    onHandleAddBeneficiary({
      beneficiaryAddress: beneficiaryAddress,

      token: {
        isNFT: isNFT,
        contractAddress: contractAddress,
        tokenID: tokenID,
        tokenPercent: tokenPercent,
      },

      description: description,
      state: {
        saved: true,
        added: true,
      }
      
    });
    setSaved(true)
  };

  const handleSaveEdit = () => {
    if (!formIsValid || formHasError) {
      return;
    }

    onHandleEditBeneficiary({
      beneficiaryAddress: beneficiaryAddress,

      token: {
        isNFT: isNFT,
        contractAddress: contractAddress,
        tokenID: tokenID,
        tokenPercent: tokenPercent,
      },

      description: description,
      state: {
        saved: true,
        added: true,
      }
      
    });
    setSaved(true)
  }

  const getApproval = () => {
    console.log("get approval");
    setApproved(true)
  };



  

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <FormControl fullWidth sx={{ width: "100%" }} error={beneficiaryAddressHasError}>
            <InputLabel htmlFor="outlined-adornment-address">
              Beneficiary Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              aria-describedby="my-helper-text"
              value={beneficiaryAddress}
              onChange={beneficiaryAddressChangeHandler}
              onBlur={beneficiaryAddressBlurHandler}
              
              endAdornment={
                <IconButton aria-label="wallet" edge="end">
                  <AccountBalanceWalletOutlinedIcon />
                </IconButton>
              }
              label="Beneficiary Address"
            />
            <FormHelperText id="my-helper-text">
              {beneficiaryAddressHasError ? "Invalid Address" : "Your Beneficiary Address"}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth error={isNFTHasError}>
                <InputLabel>Asset Type</InputLabel>
                <Select value={isNFT} label="Asset Type" aria-describedby="asset-type-helper-text" onChange={isNFTChangeHandler} onBlur={isNFTBlurHandler}>
                  <MenuItem value={false}>Token</MenuItem>
                  <MenuItem value={true}>NFT</MenuItem>
                </Select>
                <FormHelperText id="asset-type-helper-text">
              {"NFT or Cryptocurrency"}
            </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth error={contractAddressHasError}>
                {isNFT ? (
                  <>
                    <InputLabel> {"Contract Address"}</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-contract-address"
                      label="Contract Address"
                      aria-describedby="nft-address-helper-text"
                      onClick={beneficiaryAddressChangeHandler}
                      onBlur={beneficiaryAddressBlurHandler}
                    />
                    <FormHelperText id="nft-address-helper-text">
              {"Paste the NFT contract address"}
            </FormHelperText>
                  </>
                ) : (
                  <>
                    <InputLabel> {isNFT ? "NFT" : "Token"}</InputLabel>
                    <Select
                      label="Asset"
                      value={contractAddress}
                      onChange={contractAddressChangeHandler}
                      onBlur={ contractAddressBlurHandler}
                      aria-describedby="token-address-helper-text"
                    >
                      {supportedTokens.map((_token) => (
                        <MenuItem key={_token.symbol} value={_token.contractAddress}>
                          {_token.symbol}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText id="token-address-helper-text">
              {"Select a Cryptocurrency"}
            </FormHelperText>
                  </>
                )}
              </FormControl>
            </Grid>

            {isNFT ? (
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ width: "100%" }} error={tokenIDHasError}>
                  <InputLabel htmlFor="outlined-adornment-token-id">
                    Token Id
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-token-id"
                    aria-describedby="token-id-helper-text"
                    value={tokenID}
                    onChange={tokenIDChangeHandler}
                    onBlur={tokenIDBlurHandler}
                    label="Token ID"
                  />
                  <FormHelperText id="token-id-helper-text">
              {"Token ID E.g 8001"}
            </FormHelperText>
                </FormControl>
              </Grid>
            ) : (
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ width: "100%" }} error={tokenPercentHasError}>
                  <InputLabel htmlFor="outlined-adornment-percent-token">
                    % Token
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-percent-token"
                    aria-describedby="token-percent-helper-text"
                    value={tokenPercent}
                    onChange={tokenPercentChangeHandler}
                    onBlur={tokenPercentBlurHandler}
                    label="% Token"
                  />
                  <FormHelperText id="token-percent-helper-text">
              {"E.g 20%, 34,567%"}
            </FormHelperText>
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
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            helperText={"Add a description"}
            FormHelperTextProps={{
              id: "beneficiary-description-text",
            }}
            InputLabelProps={{
              htmlFor: "outlined-multiline-flexible-beneficiary-desc",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <TagIcon />
                </InputAdornment>
              ),
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
        {!approved && <Button  variant={"outlined"} onClick={getApproval}>Grant Approval</Button>}
        
        
        {!added && <Button
          variant={"outlined"}
          sx={{
            ml: 2,
          }}
          disabled={formHasError}
          onClick={handleAddBeneficiary}
        >
          {"Add Beneficiary"}
        </Button>}
        { added && <Button
          variant={"outlined"}
          sx={{
            ml: 2,
          }}
          color="error"
          onClick={handleDeleteBeneficiary}
        >
          {"Delete"}
        </Button>}

        { isEditing && <Button
          variant={"outlined"}
          sx={{
            ml: 2,
          }}
          onClick={handleSaveEdit}
        >
          {"Save Edit"}
        </Button> }
      </Grid>
    </Box>
  );
};

export default Beneficiary;
