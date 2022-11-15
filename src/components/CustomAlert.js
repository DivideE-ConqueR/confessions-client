import { forwardRef } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert({
  open,
  message,
  severity,
  duration = 3000,
  handleClose,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
