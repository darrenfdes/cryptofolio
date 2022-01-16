import React from "react";
import Ticker from "react-ticker";
import CoinTicker from "./CoinTicker";
import { useQuery } from "react-query";
import { getTrendingCoins } from "../../apis/coinGecko";
import { LinearProgress } from "@material-ui/core";

const Ribbon = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["trendingCoins", "usd"],
    () => getTrendingCoins("usd")
  );

  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (isError) {
    return error.message;
  }

  return (
    <div style={{ backgroundColor: "#080738" }}>
      <Ticker>{() => <CoinTicker coins={data} />}</Ticker>
    </div>
  );
};

export default Ribbon;
