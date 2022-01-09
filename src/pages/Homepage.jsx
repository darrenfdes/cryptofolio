import React from "react";
import { useQuery } from "react-query";
import * as api from "../apis/coinGecko";
import axios from "axios";
import Banner from "../components/Banner/Banner";

const fetchCoinsList = async (currency) => {
  console.log(currency);
  currency = "usd";
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  return res.json();
};

const Homepage = () => {
  return <Banner />;
};

export default Homepage;
