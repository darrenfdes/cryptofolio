import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { fetchNews } from "../../apis/newsApi";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { useState } from "react";
import { useLayoutEffect } from "react";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "90%",
    display: "flex",
    alignItems: "center",
  },
  root: {
    maxWidth: 345,
    [theme.breakpoints.down("md")]: {
      maxWidth: 220,
    },

    backgroundColor: "#07124d",
  },
  media: {
    height: 160,
    [theme.breakpoints.down("md")]: {
      height: 120,
    },
  },
  next: {
    float: "right",
  },
  prev: {
    float: "left",
  },
}));

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const SlickCarousel = () => {
  const classes = useStyles();

  const [width] = useWindowSize();

  let numberOfCards = width > 1700 ? 5 : width > 684 ? 4 : 2;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: numberOfCards,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    cssEase: "linear",
  };

  const searchTerm = "crypto";

  const {
    data: news,
    isLoading: isLoadingNews,
    isError: isErrorNews,
    error: errorNews,
  } = useQuery(["news", searchTerm], () => fetchNews(searchTerm));

  if (isLoadingNews) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (isErrorNews) {
    return errorNews.message;
  }

  const articles = news?.articles;

  return (
    <Slider {...settings} className={classes.slider}>
      {articles.map((x) => (
        <Card className={classes.root} key={x.title}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              alt={x.title}
              image={x?.urlToImage}
              title={x.title}
            />
            <a
              href={x?.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit" }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ color: "white" }}
                >
                  {x.title}
                </Typography>
              </CardContent>
            </a>
          </CardActionArea>
        </Card>
      ))}
    </Slider>
  );
};

export default SlickCarousel;
