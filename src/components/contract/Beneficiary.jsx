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
  Divider,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { mumbai } from "../../libs/assets";
import Modal from "../app/Modal";
import { getApproved, getApprovedTokens, getBalance } from "../../libs/functions";
import { Web3Context } from "../../context/Web3Context";
import ApproveTokenModal from "./ApproveTokenModal";
import ApproveNFTModal from "./ApproveNftModal";
import useTrustInput from "../../hooks/trust-input";


const Beneficiary = ({beneficiary = null, onHandleAddBeneficiary, onHandleDeleteBeneficiary, onHandleEditBeneficiary}) => {

  const { accounts } = useContext(Web3Context)

  const [isNFT, setIsNFT] = useState(false) 
  const [description, setDescription] = useState('') 

  const beneficiaryAddress = useTrustInput(null, true)
  const collectionAddress = useTrustInput(null, true)
  const tokenId = useTrustInput(null, false)
  const amount = useTrustInput(null, false)


  //for Token
  const [currentToken, setCurrentToken] = useState(null)
  const [balance, setBalance] = useState(0)
  const [allowance, setAllowance] = useState(0)
  const [approveToken, setApproveToken] = useState(false)

  const onSelectToken = (e) => {
    setCurrentToken(mumbai[e.target.value])
  }

  //for Token
  const [approveNFT, setApproveNFT] = useState(false)
  const [isApproved, setIsApproved] = useState(false)


  const onChangeTokenType = (e) => {
    setIsNFT(e.target.value)
  }


  const isNftApproved = async() => {
    try {
      setIsApproved(await getApproved(collectionAddress.value, tokenId.value))
    } catch(e) {
      setIsApproved(false)
      console.error(e)
    }
  }


  useEffect(() => {
    tokenDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentToken])

  const tokenDetails = async() => {
    if (!currentToken) return
    setAllowance(await getApprovedTokens(currentToken.address, accounts))
    setBalance(await getBalance(currentToken.address, accounts))
  }

  useEffect(() => {
    isNftApproved()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId.value, collectionAddress.value])


  
  return (
    <Box sx={{mb: 4,}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <FormControl fullWidth sx={{ width: "100%" }} error={beneficiaryAddress.hasError}>
            <InputLabel htmlFor="outlined-adornment-address">
              Beneficiary Address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-address"
              aria-describedby="my-helper-text"
              value={beneficiaryAddress.value}
              onChange={beneficiaryAddress.onChange}
              onBlur={beneficiaryAddress.onBlur}
              autoComplete='off'
              endAdornment={
                <IconButton aria-label="wallet" edge="end">
                  <AccountBalanceWalletOutlinedIcon />
                </IconButton>
              }
              label="Beneficiary Address"
            />
            <FormHelperText id="my-helper-text">
              {beneficiaryAddress.hasError ? "Invalid Address" : "Your Beneficiary Address"}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth //error={isNFTHasError}
              >
                <InputLabel>Asset Type</InputLabel>
                <Select value={isNFT} label="Asset Type" aria-describedby="asset-type-helper-text" onChange={onChangeTokenType} //onBlur={isNFTBlurHandler}
                >
                  <MenuItem value={false}>Token</MenuItem>
                  <MenuItem value={true}>NFT</MenuItem>
                </Select>
                <FormHelperText>{"NFT or Cryptocurrency"}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth error={collectionAddress.hasError}>
                {isNFT ? (
                  <>
                    <InputLabel> {"Collection Address"}</InputLabel>
                    <OutlinedInput
                      label="Collection Address"
                      onClick={collectionAddress.onChange}
                      onBlur={collectionAddress.onBlur}
                    />
                    <FormHelperText>{"Paste the NFT collection address"}</FormHelperText>
                      </>
                    ) : (
                      <>
                        <InputLabel> {"Token"} </InputLabel>
                        <Select
                          label="Asset"
                          value={currentToken?.address}
                          onChange={onSelectToken}
                          // onBlur={ collectionAddressBlurHandler}
                          aria-describedby="token-address-helper-text"
                        >
                          {
                            mumbai.map((token, i) => (
                              <MenuItem key={token.symbol} value={i}>
                                {token.symbol}
                              </MenuItem>
                            ))
                          }
                        </Select>
                        <FormHelperText>{"Select a Cryptocurrency"}</FormHelperText>
                      </>
                    )}
                  </FormControl>
                </Grid>

              {isNFT ? (
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ width: "100%" }} error={tokenId.hasError}
                  >
                    <InputLabel htmlFor="outlined-adornment-token-id">
                      Token Id
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-token-id"
                      aria-describedby="token-id-helper-text"
                      value={tokenId.value}
                      onChange={tokenId.onChange}
                      onBlur={tokenId.onBlur}
                      autoComplete='off'
                      label="Token ID"
                    />
                    <FormHelperText>{"Token ID E.g 8001"}</FormHelperText>
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <FormControl fullWidth sx={{ width: "100%" }} error={amount.hasError}>
                    <InputLabel htmlFor="outlined-adornment-percent-token">
                      Token Amount
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-percent-token"
                      aria-describedby="token-percent-helper-text"
                      value={amount.value}
                      onChange={amount.value}
                      label="Token Amount"
                      autoComplete='off'
                    />
                    <FormHelperText>{"E.g 100 USDC"}</FormHelperText>
                </FormControl>
              </Grid>
              )}
            </Grid>
          </Grid>

        {
          !isNFT && <>
            <Grid item xs={6} sm={3}>
              Balance:{" "} {balance}
            </Grid>
            <Grid item xs={6} sm={3}>
              Allowance:{" "} {allowance}
            </Grid>
          </>
        }

        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-multiline-flexible-beneficiary-desc"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            //onBlur={descriptionBlurHandler}
            helperText={"Add a description"}
            autoComplete='off'
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

      { (currentToken && !isNFT) &&
        <Grid container item justifyContent={"flex-end"} sx={{my: 2}}>
          <Button variant={"outlined"} onClick={() => setApproveToken(true)}>Grant Approval</Button>
        </Grid>
      }

      { (isNFT && collectionAddress.value && tokenId.value) &&
        <Grid container item justifyContent={"flex-end"} sx={{my: 2}}>
          <Button variant={"outlined"} onClick={() => setApproveNFT(true)}>
            { isApproved ? "View NFT" : "Grant Approval"}
          </Button>
        </Grid>
      }

      <Divider sx={{mt:4}} />

      <ApproveTokenModal 
        token={currentToken} 
        allowance={allowance}  
        title={`Grant us approval to your ${currentToken?.symbol}`} 
        open={approveToken} 
        setOpen={setApproveToken} /> 
      
      <ApproveNFTModal 
        approved={isApproved}
        collectionAddress={collectionAddress.value} 
        tokenId={tokenId.value}  
        title={`Grant us approval to your NFT`} 
        open={approveNFT} 
        setOpen={setApproveNFT} /> 

    </Box>
  );
};

export default Beneficiary;
