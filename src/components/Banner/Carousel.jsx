import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { fetchNews } from "../../apis/newsApi";
import { useQuery } from "react-query";
import { getTrendingCoins } from "../../apis/coinGecko";
import { useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "90%",
    display: "flex",
    alignItems: "center",
  },
  root: {
    maxWidth: 345,
    [theme.breakpoints.down("md")]: {
      maxWidth: 300,
    },
    backgroundColor: "#07124d",
  },
  media: {
    height: 160,
    [theme.breakpoints.down("md")]: {
      height: 120,
    },
  },
}));

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const Carousel = () => {
  const classes = useStyles();

  const currencyStore = useSelector((state) => state.currency.value);

  const currency = currencyStore.toLowerCase();
  console.log(currency);

  const {
    data: trendingCoins,
    isLoading,
    isError,
    error,
  } = useQuery(["trendingCoins", currency], () => getTrendingCoins(currency), {
    enabled: Boolean(currency),
  });

  const searchTerm = "blockchain technology";

  const {
    data: news,
    isLoading: isLoadingNews,
    isError: isErrorNews,
    error: errorNews,
  } = useQuery(["news", searchTerm], () => fetchNews(searchTerm));

  if (isLoadingNews && isLoading) {
    return "Fetching Data";
  }

  if (isErrorNews) {
    return errorNews.message;
  }

  if (isError) {
    return error.message;
  }

  const articles = news?.articles;

  const items = articles?.map((x) => {
    return (
      <>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            alt={x.title}
            image={x.urlToImage ? x.urlToImage : demoImage}
            title={x.title}
          />
          <CardContent>
            <Typography
              variant="body2"
              component="p"
              style={{ color: "white" }}
            >
              {x.title}
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 5,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        responsive={responsive}
        items={items}
        autoPlay
        autoPlayInterval={30000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        // renderNextButton={() => <NavigateNextIcon />}
        // renderPrevButton={() => <NavigateBeforeIcon />}
      />
    </div>
  );
};

export default Carousel;
