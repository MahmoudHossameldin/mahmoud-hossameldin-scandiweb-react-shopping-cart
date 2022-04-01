import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider } from "./context/dataContext";
import { CartContextProvider } from "./context/cartContext";

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <CartContextProvider>
        <Router>
          <App />
        </Router>
      </CartContextProvider>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
