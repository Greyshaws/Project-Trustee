import React, { useState, useContext } from "react";
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

  const handleSelectedTemplate = (_template) => {
    onDone(_template)
  }

  return (
    <Box
      sx={{
        my: 2,
        width: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              cursor: "pointer",

              "&:hover": {
                borderColor: "primary.light",
              },
            }}
            onClick={createNewHandler}
          >
            <Typography variant="h4">Create New Trust</Typography>
            <Typography variant="body1">Create New Trust</Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              cursor: "pointer",
              height: "100%",
              "&:hover": {
                borderColor: "primary.light",
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
      {isTemplate && <TrustTemplates onSelectTemplate={handleSelectedTemplate}/>}
    </Box>
  );
};

export default Step1;
