import React from "react";
import { useGetCryptosListQuery } from "../services/cryptoApi";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosListQuery();

  if (!isFetching) {
    console.log(data);
  }

  return <div></div>;
};

export default Homepage;
