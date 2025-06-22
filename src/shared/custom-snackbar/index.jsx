import { Alert, Snackbar as SB, Slide } from "@mui/material";
import { useEffect, useState } from "react";

const Snackbar = ({
  message,
  duration = 6000,
  stateChange,
  type = "success", //'success' | 'info' | 'warning' | 'error'
  ...props
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (stateChange) {
      setOpen(true);
    }
  }, [stateChange]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <SB
      open={open}
      onClose={handleClose}
      slots={{ transition: Slide }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={duration}
      {...props}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled" //'standard' | 'filled' | 'outlined'
      >
        {message}
      </Alert>
    </SB>
  );
};

export default Snackbar;
