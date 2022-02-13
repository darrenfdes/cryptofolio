import axios from "axios";

export const fetchNews = (search) =>
  axios
    .get(`https://newsapi.org/v2/everything?q=${search}`, {
      headers: {
        "X-Api-Key": "c98deb31fb6743feb117bf28804cb77e",
      },
    })
    .then((res) => res.data);

export const searchBingNews = (search) =>
  axios.get(`https://bing-news-search1.p.rapidapi.com/news/`, {
    params: {
      q: search,
      count: "20",
      freshness: "Day",
      textFormat: "Raw",
      safeSearch: "Moderate",
    },
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "1567b88662msh02aff047ef5389bp1395b9jsn26e8271e6f12",
    },
  });
