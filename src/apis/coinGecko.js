import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

export const getCoinList = (currency) =>
  api
    .get(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
    .then((res) => res.data);

export const getTrendingCoins = () =>
  api.get("/search/trending").then((res) => res.data);
