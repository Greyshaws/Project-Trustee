import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Close } from '@mui/icons-material';
import styles from '../../styles/Home.module.css'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up"  />;
});

export default function Modal({title, children}) {

  const { open, setOpen } = props

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      >

      <DialogActions> <Button onClick={handleClose}> <Close /> </Button></DialogActions>

      <DialogTitle sx={{color: "#000"}}>{title}</DialogTitle>

      <DialogContent className={styles.modal}>{children}</DialogContent>

    </Dialog>
  )
}
