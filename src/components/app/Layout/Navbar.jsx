import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { truncateAddress } from "../../../libs/utils";
import SwitchNetwork from "../SwitchNetwork";
import { Web3Context } from "../../../context/Web3Context";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import NavDrawer from "./NavDrawer";
import HomeIcon from "@mui/icons-material/Home";
import InsightsIcon from "@mui/icons-material/Insights";
import DescriptionIcon from "@mui/icons-material/Description";



const pages = [
  {
    text: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    text: "About",
    link: "/about",
    icon: <InsightsIcon />,
  },
  {
    text: "Paper",
    link: "/white-paper",
    icon: <DescriptionIcon />,
  },
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { connect, loading, accounts } = useContext(Web3Context);

  const router = useRouter();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "white",
          borderBottom: 1,
          borderColor: "rgba(0,0,0,0.12)",
        }}
        elevation={0}
      >
        <Toolbar>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "primary.main",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            TRUSTEE
          </Typography>

          {/* Small Screens */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <NavDrawer pages={pages} />
          </Box>
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              color: "primary.main",
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            TRUSTEE
          </Typography>

          {/* Big Screens */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              border: 1,
            }}
          >
            {pages.map((page) => (
              <Box key={page.link} sx={{ my: 0, mx: 2, display: "block" }}>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.6)",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <Link
                    href={page.link}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {page.text}
                  </Link>
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, ml: { md: 6 } }}>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={connect}
            >
              {accounts ? truncateAddress(accounts) : "Connect"}
            </LoadingButton>

           
            
          </Box>

          {accounts && <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem onClick={() => {
                  router.push("/view-trust")
                }} sx={{
                  pl: 1,
                }}>
                  <IconButton sx={{
                    mr: 0,
                  }}>
                    <HistoryEduIcon />
                    </IconButton>
                  <Typography textAlign="center">View Trust</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  router.push("/new-trust")
                }} sx={{
                  pl: 1,
                }}>
                <IconButton sx={{
                    mr: 0,
                  }}>
                <CreateOutlinedIcon />
              </IconButton>
                  <Typography textAlign="center">Create Trust</Typography>
                </MenuItem >
                <MenuItem onClick={() => {
                  console.log("disconnect")
                }} sx={{
                  pl: 1,
                }}>
                  <IconButton sx={{
                    mr: 0,
                  }}>
                    <LogoutIcon />
                  </IconButton>
                  <Typography textAlign="center">Disconnect</Typography>
                </MenuItem>
              
              
            </Menu>
          </Box>}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwitchNetwork />
    </React.Fragment>
  );
};

export default NavBar;

{
  /*

<LoadingButton loading={loading} onClick={connect} variant="contained">
                  { !accounts ?   "Connect" : truncateAddress(accounts) }
                </LoadingButton>
*/
}
