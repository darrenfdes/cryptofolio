import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import bannerImg from "../../assets/5040007.jpg";
import Carousel from "./Carousel";
import SlickCarousel from "./SlickCarousel";

const useStyles = makeStyles(() => ({
  banner: {
    height: "25rem",
    backgroundImage: `url(${bannerImg})`,
    color: "white",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.banner} elevation={0} square>
      <div className={classes.bannerContent}>
        <SlickCarousel />
      </div>
    </Paper>
  );
};

export default Banner;
