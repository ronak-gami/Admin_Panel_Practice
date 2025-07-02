import { Alert, Snackbar as SB, Slide } from "@mui/material";
import { useEffect, useState } from "react";

const Snackbar = ({
  message,
  duration = 6000,
  snackbarKey,
  type = "success",
  ...props
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (snackbarKey) {
      setOpen(true);
    }
  }, [snackbarKey]);

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
      <Alert onClose={handleClose} severity={type} variant="filled">
        {message}
      </Alert>
    </SB>
  );
};

export default Snackbar;
