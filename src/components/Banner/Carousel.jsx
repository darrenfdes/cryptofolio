import React from "react";
import { makeStyles } from "@material-ui/core";
import { fetchNews } from "../../apis/newsApi";
import { useQuery } from "react-query";
import { getTrendingCoins } from "../../apis/coinGecko";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "70%",
    display: "flex",
    alignItems: "center",
  },
}));

const Carousel = () => {
  const classes = useStyles();

  const {
    data: trendingCoins,
    isLoading,
    isError,
    error,
  } = useQuery("trendingCoins", getTrendingCoins);

  const {
    data: news,
    isLoading: isLoadingNews,
    isError: isErrorNews,
    error: errorNews,
  } = useQuery(["news", "cryptocurrency"], fetchNews);

  if (isLoadingNews && isLoading) {
    return "Fetching Data";
  }

  if (isErrorNews) {
    return errorNews.message;
  }

  if (isError) {
    return error.message;
  }

  console.log(trendingCoins);

  return <div className={classes.carousel}>Carousel</div>;
};

export default Carousel;
