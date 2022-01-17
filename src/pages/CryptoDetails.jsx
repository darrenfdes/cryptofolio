import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCoinData } from "../apis/coinGecko";
import { useQuery } from "react-query";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import parse from "html-react-parser";
import { getCommaSeperatedNumber } from "../components/CoinTable/CoinTable";

import millify from "millify";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItem: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(5),
    borderRight: "2px solid grey",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
    maxWidth: 200,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: "20px",
    paddingLeft: theme.spacing(3),
  },
  description: {
    width: "100%",
    padding: theme.spacing(3),
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CryptoDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const currency = useSelector((state) => state.currency.value);
  const currencySymbol = useSelector((state) => state.currency.symbol);
  const { data, isLoading, isError, error } = useQuery(
    ["coinData", id],
    () => getCoinData(id),
    {
      enabled: Boolean(id),
    }
  );

  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (isError) {
    return error.message;
  }

  const coin = data?.data;
  // const [coin, setCoin] = useState();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          className={classes.image}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:{coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            <Typography variant="h5">
              {currencySymbol}
              {getCommaSeperatedNumber(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            <Typography variant="h5">
              {currencySymbol}
              {millify(coin?.market_data.market_cap[currency.toLowerCase()], {
                precision: 3,
              })}
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo
        coin={coin}
        currency={currency.toLowerCase()}
        symbol={currencySymbol}
      />
    </div>
  );
};

export default CryptoDetails;
