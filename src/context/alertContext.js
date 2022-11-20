import { createContext, useState } from "react";
import CustomAlert from "../components/CustomAlert";

export const AlertContext = createContext(null);
AlertContext.displayName = "AlertContext";

export default function AlertProvider({ children }) {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const openAlert = (props) => {
    setAlertState({
      open: true,
      message: props.message,
      severity: props.severity,
    });
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({ open: false });
  };

  return (
    <AlertContext.Provider value={{ openAlert }}>
      {children}

      <CustomAlert
        open={alertState.open}
        message={alertState.message}
        severity={alertState.severity}
        handleClose={closeAlert}
      />
    </AlertContext.Provider>
  );
}
