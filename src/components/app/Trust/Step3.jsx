import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import relativeTIme from "dayjs/plugin/relativeTime";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { TrustContext } from "../../../context/trust-context";

dayjs.extend(relativeTIme);

const Step3 = ({ onConfimTrustCreation }) => {
  const trustCtx = useContext(TrustContext);

  const { workingTrust, createTrust } = trustCtx;

  const confirmCreateTrustHandler = () => {
    createTrust();
  }

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          my: 4,
        }}
      >
        Confirm to transfer
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          mt: 4,
          mb: 2,
          alignItems: "center",
        }}
      >
        <Grid item xs={5}>
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "large",
              }}
            >
              {workingTrust.amount} Eth{" "}
            </Typography>
            <Typography variant="body2">from you Assets</Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              width: "auto",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              To
            </Typography>
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
            <Typography
              variant="body1"
              sx={{
                fontSize: "large",
              }}
            >
              {workingTrust.address}{" "}
            </Typography>
            <Typography variant="body2">{"(this address)"}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          wordBreak: "break-word",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "large",
          }}
        >
          0n {dayjs(workingTrust.date.dateTimeFullObject).format("YYYY-MM-DD")}{" "}
          {dayjs(workingTrust.date.dateTimeFullObject).fromNow()}
        </Typography>
      </Paper>

<Stack sx={{
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end"
}}>
<Button
        variant="contained"
        sx={{
          my: 3,
        }}
        onClick={confirmCreateTrustHandler}
      >
        CONFIRM
      </Button>
</Stack>
     
    </Box>
  );
};

export default Step3;
