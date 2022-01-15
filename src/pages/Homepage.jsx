import React from "react";
import Banner from "../components/Banner/Banner";
import CoinTable from "../components/CoinTable/CoinTable";
import Ribbon from "../components/Ribbon/Ribbon";

const Homepage = () => {
  return (
    <>
      <Ribbon />
      <Banner />
      <CoinTable />
    </>
  );
};

export default Homepage;
