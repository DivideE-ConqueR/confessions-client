import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import axios from "../api/base";
import Navbar from "../components/Navbar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function New() {
  const navigate = useNavigate();

  const [postBody, setPostBody] = useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleAlertOpen = (props) => {
    setAlertState({
      open: true,
      message: props.message,
      severity: props.severity,
    });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState({ open: false, message: "", severity: "" });
    navigate("/");
  };

  const handleClick = async () => {
    const IPAddress = await axios
      .get(
        `https://geolocation-db.com/json/${process.env.REACT_APP_GEOLOCATION_API_KEY}`
      )
      .then((response) => response.data.IPv4)
      .catch((err) => {
        handleAlertOpen({
          message: "Something went wrong!",
          severity: "error",
        });
        console.log(err);
      });

    await axios
      .post("/posts", {
        postBody: postBody,
        postTags: [...new Set(postBody.match(/(#+[a-zA-Z0-9(_)]{1,})/gi))],
        IPAddress: IPAddress,
      })
      .then(() => {
        handleAlertOpen({
          message: "Post created successfully!",
          severity: "success",
        });
        console.log("posted");
      })
      .catch((err) => {
        handleAlertOpen({
          message: "Something went wrong!",
          severity: "error",
        });
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />

      <div className="p-4 space-y-6">
        <h1 className="font-medium text-center">
          Share your secret with the world
        </h1>
        <textarea
          id="message"
          rows="10"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          className="p-2.5 w-full text-sm bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"
          placeholder="Your message..."
        />
        <button
          onClick={handleClick}
          className="w-full p-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg"
        >
          Post
        </button>
        <Snackbar
          open={alertState.open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertState.severity}
            sx={{ width: "100%" }}
          >
            {alertState.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
