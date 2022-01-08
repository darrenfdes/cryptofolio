import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.coingecko.com",
  headers: {
    Accept: "application/json",
  },
});

export const test = (currency) =>
  axiosClient
    .get(
      `/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
    .then((res) => res.data);

// export const getCoinList = (currency) => {
//   api
//     .get(
//       `/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
//     )
//     .then((res) => res.data);
// };

// export const getCoinDetails = (id) => api.get(`${id}`).then((res) => res.data);

// export const getHistoricalChart = (id, days = 365, currency) =>
//   api
//     .get(
//       `/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
//     )
//     .then((res) => res.data);

// export const getTrendingCoins = (currency) =>
//   api
//     .get(
//       `markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
//     )
//     .then((res) => res.data);

// export const CoinList = (currency) =>
//   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

// export const SingleCoin = (id) =>
//   `https://api.coingecko.com/api/v3/coins/${id}`;

// export const HistoricalChart = (id, days = 365, currency) =>
//   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

// export const TrendingCoins = (currency) =>
//   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
