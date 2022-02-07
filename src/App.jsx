import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import "./App.css";
import Navbar from "./layout/Navbar";
import Homepage from "./pages/Homepage";
import Notification from "./components/Alert/Notification";
import { useSelector } from "react-redux";

const News = React.lazy(() => import("./pages/News"));
const CryptoDetails = React.lazy(() => import("./pages/CryptoDetails"));
const Cryptocurrency = React.lazy(() => import("./pages/Cryptocurrency"));

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
  },
  viewport: {
    display: "flex",
    left: 0,
  },
}));

const App = () => {
  const classes = useStyles();

  const uiStore = useSelector((state) => state.ui.colorMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: uiStore ? "dark" : "light",
        },
      }),
    [uiStore]
  );

  console.log("re-render *app.jsx*");
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <div className={classes.app}>
          <Navbar />
          <div className={classes.main}>
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/crypto" element={<Cryptocurrency />} />
                <Route path="/crypto/:id" element={<CryptoDetails />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </Suspense>
          </div>
          <Notification />
          {/* <Footer /> */}
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
