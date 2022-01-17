import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#001529",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
    textColor: "white",
  },
  footerText: {
    color: "white",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Typography variant="subtitle2" className={classes.footerText}>
        Copyright © {new Date().getFullYear()}
        <Link to="/">Cryptofolio Inc</Link>
        <br />
        designed by{" "}
        <a
          href="https://github.com/darrenfdes"
          target="_blank"
          rel="noreferrer"
        >
          darrenmfdes
        </a>
      </Typography>
    </div>
  );
};

export default Footer;
