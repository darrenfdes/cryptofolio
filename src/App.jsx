import React from "react";
import { Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./App.css";
import Navbar from "./layout/Navbar";
import Homepage from "./pages/Homepage";
import Cryptocurrency from "./pages/Cryptocurrency";
import CryptoDetails from "./pages/CryptoDetails";
import News from "./pages/News";
// import Footer from "./layout/Footer";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
  },
  viewport: {
    display: "flex",
    left: 0,
  },

  // main: {
  //   [theme.breakpoints.down("sm")]: {
  //     paddingLeft: "74px",
  //   },
  // },
}));

const App = () => {
  const classes = useStyles();
  console.log("re-render *app.jsx*");
  return (
    <div className={classes.app}>
      <Navbar />
      <div className={classes.main}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/crypto" element={<Cryptocurrency />} />
          <Route path="/crypto/:id" element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
