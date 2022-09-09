import React from "react";
import ReactDOM from "react-dom/client";
import en from "javascript-time-ago/locale/en";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import JavascriptTimeAgo from "javascript-time-ago";

JavascriptTimeAgo.locale(en);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
