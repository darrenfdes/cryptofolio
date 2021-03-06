import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
// import { theme } from "./theme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-store/index";
// import { ReactQueryDevtools } from "react-query/devtools";
import "react-alice-carousel/lib/alice-carousel.css";
// import { ThemeProvider } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
