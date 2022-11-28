import React, {useContext} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {TrustContext} from "../../../context/trust-context"



const TrustTemplates = ({onSelectTemplate}) => {
  const trustCtx = useContext(TrustContext);

  const { trustTemplates} = trustCtx;

  const selectTemplateHandler = (_template) => {
    onSelectTemplate(_template)
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{
        mt: 4,
        mb: 2,
        fontSize: {xs: "1.125rem", md: "1.25rem"},
      }}>Available Templates: </Typography>
      <Grid container spacing={2}>
        {trustTemplates.map((template) => {
          return (
            <Grid item xs={6} md={3} key={`${template.id}`}>
              <Paper elevation={2} sx={{
                p: 2,
                cursor: "pointer",
                height: "100%",
                
              }}
              onClick={() => {selectTemplateHandler(template)}}
              >
                <Typography variant="body1" sx={{
                  fontWeight: 400,
                  fontSize: {xs: "1.125rem", md: "1.25rem"}
                }}>{template.title}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      
    </Box>
  );
};

export default TrustTemplates;
