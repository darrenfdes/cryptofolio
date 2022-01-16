import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchNews } from "../apis/newsApi";

const News = () => {
  const [search, setSearch] = useState("blockchain technology");
  const {
    data: news,
    isLoading: isLoadingNews,
    isError: isErrorNews,
    error: errorNews,
  } = useQuery(["news", search], () => fetchNews(search));

  console.log(news);

  return <div>news</div>;
};

export default News;
