import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles, Typography } from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: "pointer",
  },
  image: {
    maxHeight: "35px",
    padding: "5px",
  },
  ticker: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#080738",
    minHeight: "45px",
    minWidth: "145px",
    color: "white",
  },
  priceDrop: {
    display: "flex",
    alignItems: "center",

    color: "red",
  },
  priceRise: {
    display: "flex",
    alignItems: "center",
    color: "green",
  },
}));

const CoinTicker = ({ coins }) => {
  console.log("re-render coin ticker");

  const classes = useStyles();

  console.log(coins[0]);

  return (
    <div style={{ display: "flex" }}>
      {coins.map((coin) => (
        <>
          <Link
            className={classes.link}
            to={`/crypto/${coin.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className={classes.ticker} key={coin.id}>
              <img src={coin.image} alt={coin.id} className={classes.image} />
              <Typography variant="subtitle2">{coin.symbol}</Typography>
              <span
                className={
                  coin.price_change_percentage_24h >= 0
                    ? classes.priceRise
                    : classes.priceDrop
                }
              >
                <Typography variant="subtitle2">
                  {coin.price_change_percentage_24h?.toFixed(2)}
                </Typography>
                %
                {coin.price_change_percentage_24h >= 0 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDown />
                )}
              </span>
            </div>
          </Link>
        </>
      ))}
    </div>
  );
};

export default CoinTicker;
