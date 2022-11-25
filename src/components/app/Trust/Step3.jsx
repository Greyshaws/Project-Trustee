import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import React from "react";
import { Button } from "@mui/material";

const Step3 = () => {
  return (
    <Box sx={{
      mb: 4
    }}>
      <Typography
        variant="h4"
        sx={{
          my: 4,
        }}
      >
        Confirm to transfer
      </Typography>

      <Grid container spacing={2} sx={{
      mt: 4,
      mb: 2,
      alignItems: "center"
    }}>
        <Grid item xs={5}>
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              height: "100%"
            }}
          >
            <Typography variant="body1" sx={{
              fontSize: "large"
            }}>2 Eth </Typography>
            <Typography variant="body2">from you Assets</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
            <Box sx={{
              width: "auto",
    }}>
            <Typography variant="body1" sx={{
              textAlign: "center"
    }}>To</Typography>
            </Box>
            

        </Grid>
        <Grid item xs={5}>
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >

<Typography variant="body1" sx={{
              fontSize: "large"
            }}>0xhshfcgbguhjashfdgdgfghddxfc </Typography>
            <Typography variant="body2">{"(this address)"}</Typography>

          </Paper>
        </Grid>
      </Grid>

      <Paper variant="outlined"
      
            sx={{
              p: 2,
              wordBreak: "break-word",
            }}>
              <Typography variant="body1" sx={{
              fontSize: "large"

            }}>
              0n 2nd December 2150 (in 127 years.)</Typography>

            

      </Paper>

      <Button variant="contained" sx={{
        my: 3
      }}>
        Create Trust
      </Button>
    </Box>
  );
};

export default Step3;
