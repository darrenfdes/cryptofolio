import React from "react";
import Ticker from "react-ticker";
import CoinTicker from "./CoinTicker";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getTrendingCoins } from "../../apis/coinGecko";

const Ribbon = () => {
  const currencyStore = useSelector((state) => state.currency.value);

  const currency = currencyStore.toLowerCase();
  console.log(currency);

  const { data, isLoading, isError, error } = useQuery(
    ["trendingCoins", currency],
    () => getTrendingCoins(currency),
    {
      enabled: Boolean(currency),
    }
  );

  if (isLoading) {
    return "Loading trending coin...";
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
