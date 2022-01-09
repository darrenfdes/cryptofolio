import axios from "axios";

const api = axios.create({
  baseURL: "https://bing-news-search1.p.rapidapi.com/",
});

export const fetchNews = (search = "cryptocurrency") =>
  api
    .get("/news/search", {
      params: {
        q: search,
      },
      headers: {
        "x-rapidapi-key": "4da4a28a10mshe470f9800598fb4p1b5b68jsn44a42802d988",
      },
    })
    .then((res) => res.data.value);
