import * as React from 'react';
import Link from "next/link"
import { useRouter } from "next/router";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AdbIcon from "@mui/icons-material/Adb";
import InsightsIcon from "@mui/icons-material/Insights";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';




export default function NavDrawer({anchor="left", pages }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const router = useRouter();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, pt: 2 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          p: 2
        }}>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, color: 'primary.main', mr: 1 }} />
          <Typography variant="h4" sx={{
            fontSize: "1rem",
            fonWeight: 700,
            color: "primary.main"
          }}>
            TRUSTEE
          </Typography>
        </Box>
        <Divider />
      <List>
        {pages.map((page, index) => (
          <ListItem key={page.link} disablePadding>
            <ListItemButton sx={{
              color: "rgba(0,0,0,0.64)",
              "&:hover": {
                color: "primary.main"
              }
            }}>
              <ListItemIcon sx={{color: "inherit"}}>
                {page.icon}
              </ListItemIcon>
              <Link href={page.link} style={{
                textDecoration: "none",
                color: "inherit",
              }}>
                {page.text}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
            <ListItemButton sx={{
              color: "rgba(0,0,0,0.64)",
              "&:hover": {
                color: "primary.main"
              }
            }}>
              <ListItemIcon sx={{color: "inherit"}}>
                <InsightsIcon />
              </ListItemIcon>
              <a href={"https://drive.google.com/file/d/1Mr-ZUylhj9NBis4W8rmlU-avAe9ShSHP/view?usp=share_link"}
                    target="_blank"
                    rel="noreferrer" style={{
                textDecoration: "none",
                color: "inherit",
              }}>
                White Paper
              </a>
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => {
              router.push("/view-trust")
            }} sx={{
              color: "rgba(0,0,0,0.64)",
              "&:hover": {
                color: "primary.main"
              }
            }}>
              <ListItemIcon sx={{color: "inherit"}}>
                <HistoryEduIcon />
              </ListItemIcon>
              <ListItemText primary={"View Trust"} />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => {
              router.push("/new-trust")
            }} sx={{
              color: "rgba(0,0,0,0.64)",
              "&:hover": {
                color: "primary.main"
              }
            }}>
              <ListItemIcon sx={{color: "inherit"}}>
                <CreateOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Create Trust"} />
            </ListItemButton>
          </ListItem>
          
      </List>
    </Box>
  );

  return (
    
        <React.Fragment >
        <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(anchor, true)}
              color="dark"
              sx={{
                                border: 1,
                borderColor: "rgba(0,0,0,0.22)",
                borderRadius: 3,
              }}
            >
              <MenuIcon />
            </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      
  );
}