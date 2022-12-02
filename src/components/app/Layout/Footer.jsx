import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TwitterIcon from "@mui/icons-material/Twitter";

const socials = [
  {
    id: "social1",
    icon: (
      <TwitterIcon
        sx={{
          color: "primary.main",
        }}
      />
    ),
    link: "/",
  },
  {
    id: "social2",
    icon: (
      <AdbIcon
        sx={{
          color: "primary.main",
        }}
      />
    ),
    link: "/",
  },
  {
    id: "social3",
    icon: (
      <AdbIcon
        sx={{
          color: "primary.main",
        }}
      />
    ),
    link: "/",
  },
];

const Footer = () => {
  return (
    <footer>
      <Box sx={{ borderTop: 1, borderColor: "rgba(0,0,0,0.12)" }}>
        <Container sx={{
          p: 2,
          // background: "#171d2e",
          // color: "white"
        }}>
          <Grid
            container
            spacing={4}
            sx={{
              flexWrap: "wrap",
              mb: 4,
              pt: { xs: 2 },
            }}
          >
            <Grid item md={6} xs={12}>
              <Box
                
              >
                <AdbIcon
                  sx={{
                    color: "primary.main",
                    fontSize: "2rem",
                  }}
                  size="large"
                />
                <Typography
                  variant="h3"
                  sx={{
                    my: 1,
                    fontSize: "1.25rem",
                    color: "primary.main",
                    fontWeight: 500,
                  }}
                >
                  Trustee
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    wordWrap: "pre-wrap",
                  }}
                >
                  Prevent your digital assets from being lost forever, Let your
                  loved ones inherit your digital asset.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "rgba(0,0,0,0.74)",
                    mb: 2,
                  }}
                >
                  Join the community
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                  }}
                >
                  {socials.map((social) => {
                    return (
                      <IconButton
                        variant="outlined"
                        key={social.id}
                        sx={{
                          border: 1,
                          borderColor: "rgba(0,0,0,0.22)",
                          borderRadius: 3,
                          mr: 1,
                        }}
                        size="small"
                      >
                        {social.icon}
                      </IconButton>
                    );
                  })}
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          
          <Stack
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">&copy; 2022 Trustee</Typography>
          </Stack>
          </Container>
      </Box>
    </footer>
  );
};

export default Footer;
