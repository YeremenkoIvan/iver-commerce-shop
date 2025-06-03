import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/icons/FontAwesomeConfig";
import "./index.css";
import { UserContextProvider } from "./context/UserContext"; // путь может отличаться

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
