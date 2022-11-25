import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TrustTemplates from "./TrustTemplates";

const Step1 = ({ onDone }) => {
  const [isTemplate, setIsTemplate] = useState(false);

  const createNewHandler = () => {
    setIsTemplate(false)
    onDone();
  };

  const chooseTemplateHandler = () => {
    setIsTemplate(true)
  }

  return (
    <Box
      sx={{
        my: 2,
        width: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              cursor: "pointer",

              "&:hover": {
                borderColor: "primary.main",
              },
            }}
            onClick={createNewHandler}
          >
            <Typography variant="h4">Create New Trust</Typography>
            <Typography variant="body1">Create New Trust</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              cursor: "pointer",

              "&:hover": {
                borderColor: "primary.main",
              },
            }}

            onClick={chooseTemplateHandler}
          >
            <Typography variant="h4">Use a Template</Typography>
            <Typography variant="body1">Create New Trust</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Templates */}
      {isTemplate && <TrustTemplates />}
    </Box>
  );
};

export default Step1;
