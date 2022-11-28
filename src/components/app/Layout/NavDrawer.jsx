import * as React from 'react';
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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function NavDrawer({anchor="left", pages }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


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
            <ListItemButton>
              <ListItemIcon>
                {page.icon}
              </ListItemIcon>
              <ListItemText primary={page.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Lorem', 'Lorem', 'Lorem'].map((text, index) => (
          <ListItem key={`${text}${index}`} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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