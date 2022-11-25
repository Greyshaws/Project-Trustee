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
import PaddedContainer from "../PaddedContainer";
import TwitterIcon from '@mui/icons-material/Twitter';

const socials = [
  {
    id: "social1",
    icon: <TwitterIcon sx={{
      color: "primary.main"

  }}/>,
    link: "/",
  },
  {
    id: "social2",
    icon: <AdbIcon sx={{
      color: "primary.main"

  }} />,
    link: "/",
  },
  {
    id: "social3",
    icon: <AdbIcon sx={{
      color: "primary.main"

  }} />,
    link: "/",
  },
];

const links = [
  {
    id: "link1",
    url: "/",
    text: "Lorem Ipsum",
  },
  {
    id: "link2",
    url: "/",
    text: "Lorem Ipsum",
  },
  {
    id: "link3",
    url: "/",
    text: "Lorem Ipsum",
  },
]

const myAddress = [
  {
    id: "addressLink1",
    url: "/",
    text: "Lorem Ipsum",
  },
  {
    id: "addressLink2",
    url: "/",
    text: "Lorem Ipsum",
  },
  {
    id: "addressLink3",
    url: "/",
    text: "Lorem Ipsum",
  },
]

const Footer = () => {
  return (
    <footer >
      <Box sx={{ borderTop: 1, borderColor: "rgba(0,0,0,0.12)"}}>

      
      <PaddedContainer>
        <Grid
          container
          spacing={4}
          sx={{
            flexWrap: "wrap",
            mb: 4,
            pt: {xs: 2}
          }}
        >
          <Grid item md={4}>
            <Box sx={{
              mx: {xs: 2}
            }}>
              <AdbIcon sx={{
                color: "primary.main",
                fontSize: "2rem"
              }} size="large" />
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
                The world’s first and largest digital marketplace for crypto
                collectibles and non-fungible tokens (NFTs). Buy, sell, and
                discover exclusive digital items.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={8}
          >
            <Grid container spacing={2}>
              <Grid item md={3.5} xs={6}>
                <Box>
                  <Typography variant="h4" sx={{
                      fontSize: "1rem",
                      my: 2,
                      mt: {xs: 0},
                      fontWeight: 500,
                    }}>Links</Typography>

                    {links.map(link => {
                      return <Link key={link.id} href={link.url} style={{textDecoration: "none", color: "inherit"}}>
                          <Typography variant="body2" sx={{
                            fontSize: "0.75rem",
                            my: 1,

                            '&:hover': {
                              fontWeight: 500,
                            }
                          }}>{link.text}</Typography>
                      </Link>
                    })}
                </Box>
              </Grid>
              <Grid item md={3.5} xs={6}>
                <Box>
                <Typography variant="h4" sx={{
                      fontSize: "1rem",
                      my: 2,
                      mt: {xs: 0},
                      fontWeight: 500,
                      
                    }}>My Address</Typography>

                    {myAddress.map(link => {
                      return <Link key={link.id} href={link.url} style={{textDecoration: "none", color: "inherit"}}>
                          <Typography variant="body2" sx={{
                            fontSize: "0.75rem",
                            my: 1,
                            '&:hover': {
                              fontWeight: 500,
                            }
                          }}>{link.text}</Typography>
                      </Link>
                    })}
                </Box>
              </Grid>
              <Grid item md={5} xs={12}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      mt: 2,
                      mb: 2
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
                        <IconButton variant="outlined" key={social.id} sx={{
                          border: 1,
                          borderColor: "rgba(0,0,0,0.22)",
                          borderRadius: 3,
                          mr: 1
                        }} size="small">
                          {social.icon}
                        </IconButton>
                      );
                    })}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Stack sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <Typography variant="caption">
                &copy; 2022 Trustee
            </Typography>

        </Stack>
      </PaddedContainer>
      </Box>
    </footer>
  );
};

export default Footer;
