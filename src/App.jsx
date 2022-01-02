import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import "./App.css";
import Navbar from "./components/Navbar";
import LeftBar from "./components/LeftBar";
import Homepage from "./pages/Homepage";
import Cryptocurrency from "./pages/Cryptocurrency";
import CryptoDetails from "./pages/CryptoDetails";
import News from "./pages/News";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
  },
  viewport: {
    display: "flex",
    left: 0,
  },
  leftbar: {
    backgroundColor: "red",
  },
  main: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "74px",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Navbar />
      <div className={classes.main}>
        <Container style={{ backgroundColor: "blue" }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/crypto" element={<Cryptocurrency />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default App;
