import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

export const getCoinList = (currency) =>
  api
    .get(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
    )
    .then((res) => res.data);

export const getTrendingCoins = (currency = "usd") =>
  api
    .get(
      `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    )
    .then((res) => res.data);

export const getCryptoStats = () => api.get("/global");
