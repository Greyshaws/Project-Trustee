import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { 
    OutlinedInput, InputLabel, FormControl, MenuItem,
    FormHelperText, Grid, Select, Button, TextField
} from "@mui/material";


const Beneficiary = () => {

    const [isNft, setIsNft] = useState(false);
    const [token, setToken] = useState("");

    const assetType = (e) => {
        setIsNft(e.target.value)
    }

    const tokenType = (e) => {
        setToken(e.target.value)
    }

    return (
    <Box>
        <Grid container spacing={2}>

            <Grid item sm={12} md={7}>
                <FormControl fullWidth sx={{ width: "100%" }}>
                    <InputLabel htmlFor="outlined-adornment-address">
                    Beneficiary Address
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-address"
                        aria-describedby="my-helper-text"
                    //   value={beneficiaryAddress}
                    //   onChange={handleAddressChange}
                        endAdornment={<IconButton aria-label="wallet" edge="end"><AccountBalanceWalletOutlinedIcon /></IconButton>
                        }
                        label="Beneficiary Address"
                    />
                    <FormHelperText id="my-helper-text">
                        Your Beneficiary Address
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} md={5}>

                <Grid container item>

                    <Grid xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Asset Type</InputLabel>
                            <Select value={isNft} label="Asset Type" onChange={assetType}>
                                <MenuItem value={false}>Token</MenuItem>
                                <MenuItem value={true}>NFT</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={4}>
                        <FormControl fullWidth>
                            {
                                isNft ? 
                                (
                                    <>
                                        <InputLabel> {"Contract Address"}</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-address"
                                            label="Contract Address"
                                        />
                                 
                                    </>
                                ) : (
                                    <>
                                        <InputLabel> { isNft ? "NFT" : "Token" }</InputLabel>
                                        <Select label="Asset" value={token} onChange={tokenType}>
                                            <MenuItem value={"USDT Address"}>USDT</MenuItem>
                                            <MenuItem value={"USDC Address "}>USDC</MenuItem>
                                        </Select>
                                    </>
                                )
                            }
                        </FormControl>
                    </Grid>


                    <Grid xs={4}>
                        <FormControl fullWidth sx={{ width: "100%" }}>
                            <InputLabel htmlFor="outlined-adornment-address">
                                {isNft ? "Token Id": "% Token"}
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


            <Grid xs={4}> <TextField label={"Description"} /> </Grid>

            <Grid xs={4}> Balance  Allowance </Grid>

            <Grid xs={4}> <Button variant={'contained'}>Grant Approval</Button> </Grid>


        </Grid>
    </Box>
    );
};

export default Beneficiary;
