import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Toast(props) {

  const { type, message, open, setOpen } = props

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar 
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}>

        {
            type === "error" ? (        
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>) :
            (
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
            )
        }

    </Snackbar>
    );
}
