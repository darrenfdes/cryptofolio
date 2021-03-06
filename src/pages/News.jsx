import {
  CircularProgress,
  Grid,
  Card,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchNews } from "../apis/newsApi";
import moment from "moment";
import parse from "html-react-parser";
import { getCoinList } from "../apis/coinGecko";

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100%",
  },
  newsCard: {
    maxWidth: 345,
  },
  provider: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#646665",
    padding: "5px",
  },
  search: {
    paddingTop: theme.spacing(3),
  },
  media: {
    height: 160,
    [theme.breakpoints.down("md")]: {
      height: 120,
    },
  },
  info: {
    maxHeight: 260,
  },
}));

const News = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("crypto");
  const {
    data: news,
    isLoading,
    isError,
    error,
  } = useQuery(["news", search], () => fetchNews(search));

  const currency = "usd";
  const {
    data,
    isError: coinError,
    isLoading: CoinLoading,
  } = useQuery(["coinList", currency], () => getCoinList(currency));

  if (CoinLoading) {
    return "Fetching Coins ...";
  }

  if (isError) {
    return error.message() + "free news Api disabled is production";
  }

  if (coinError) {
    return error.message();
  }

  return (
    <div className={classes.page}>
      <Grid spacing={5} container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Autocomplete
            onChange={(event, newValue) => {
              setSearch(newValue.id);
            }}
            className={classes.search}
            options={data}
            getOptionLabel={(data) => data?.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Crypto"
                variant="outlined"
              />
            )}
          />
        </Grid>

        {isLoading && <CircularProgress color="secondary" />}
        {news?.articles.map((news, i) => (
          <Grid item key={i}>
            <Card className={classes.newsCard}>
              <a href={news?.url} target="_blank" rel="noreferrer">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    alt={news?.title}
                    image={news?.urlToImage}
                  />
                  <CardContent className={classes.info}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      color="primary"
                    >
                      {news?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {news?.description > 80
                        ? parse(`${news?.description.substring(0, 80)}...`)
                        : parse(news?.description)}
                    </Typography>
                  </CardContent>

                  <div className={classes.provider}>
                    <Typography variant="body2">{news?.source.name}</Typography>
                    <Typography variant="body2">
                      {moment(news?.publishedAt).startOf("ss").fromNow()}
                    </Typography>
                  </div>
                </CardActionArea>
              </a>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default News;
