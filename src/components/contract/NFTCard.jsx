/* eslint-disable @next/next/no-img-element */
import { Card, Grid, Typography } from "@mui/material"
import React from "react"
import { getNFTUrl } from "../../libs/utils"


const NFTCard = (props) => {

    const { image, name,  } = props.nft

    return (
        <Card justifyContent={"center"}  sx={{borderRadius: "10px", width: "100%"}}>

            <Grid container item justifyContent={"center"}>
                <img src={getNFTUrl(image)} height="auto" width="100%" alt="NFT image" />
            </Grid>

            <Typography sx={{ fontWeight: 700, fontSize: "1.4em"}} variant="body1">{name}</Typography>

        </Card>

    )
}

export default NFTCard