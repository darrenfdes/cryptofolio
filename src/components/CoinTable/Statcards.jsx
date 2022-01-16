import React from "react";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
  },

  card: {
    width: "8rem",
    height: "5rem",
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "#706e6e",
    // [theme.breakpoints.down("sm")]: {
    //   width: "6rem",
    //   height: "3rem",
    // },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
}));

const Statcards = ({ stats }) => {
  const classes = useStyles();

  const [gas, setGas] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get(
        "https://ethgasstation.info/api/ethgasAPI.json?"
      );
      setGas(results.data);
    };
    fetchData();
  }, []);

  return (
    <Container className={classes.container}>
      <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
        <span className={classes.cardContent}>
          <Typography color="primary" variant="h6">
            {stats?.active_cryptocurrencies}
          </Typography>
          <Typography variant="subtitle2"># of Coins</Typography>
        </span>
      </Box>

      <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
        <span className={classes.cardContent}>
          <Typography color="primary" variant="h6">
            {stats?.markets}
          </Typography>
          <Typography variant="subtitle2"># of Markets</Typography>
        </span>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
        <span className={classes.cardContent}>
          <Typography color="primary" variant="h6">
            {stats?.ongoing_icos}
          </Typography>
          <Typography variant="subtitle2">Ongoing ICOs</Typography>
        </span>
      </Box>
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        className={classes.card}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span
          style={{
            paddingTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FaBitcoin size={20} style={{ paddingRight: "2px" }} />
          <Typography color="primary" variant="h6">
            {(stats?.market_cap_percentage.btc).toFixed(2)}%
          </Typography>
        </span>

        <Typography variant="subtitle2">Dominance</Typography>
      </Box>
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        className={classes.card}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span
          style={{
            paddingTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FaEthereum size={20} />
          <Typography color="primary" variant="h6">
            {(stats?.market_cap_percentage.eth).toFixed(2)}%
          </Typography>
        </span>

        <Typography variant="subtitle2">Dominance</Typography>
      </Box>
      <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
        <Typography
          color="primary"
          gutterBottom
          style={{ paddingTop: "10px" }}
          variant="h6"
        >
          {gas?.average / 10}Gwei
        </Typography>
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "#706e6e",
          }}
        >
          <LocalGasStationIcon fontSize="small" />
          <Typography variant="subtitle1">ETH Gas</Typography>
        </span>
      </Box>
    </Container>
  );
};

export default Statcards;
