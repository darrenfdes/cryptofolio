import axios from "axios";

export const fetchNews = (search) =>
  axios
    .get(`https://newsapi.org/v2/everything?q=${search}`, {
      headers: {
        "X-Api-Key": "c98deb31fb6743feb117bf28804cb77e",
      },
    })
    .then((res) => res.data);
