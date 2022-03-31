import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider } from "./context/dataContext";

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <Router>
        <App />
      </Router>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
