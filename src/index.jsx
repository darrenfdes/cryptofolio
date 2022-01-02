import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { theme } from "./theme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-store/store";
// import { ThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
