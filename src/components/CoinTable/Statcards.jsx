import React from "react";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
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
    // color: "#706e6e",
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
  stats: {
    color: theme.palette.text.secondary,
  },
}));

const Statcards = ({ stats, gas }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="space-around"
      className={classes.root}
      spacing={2}
    >
      <Grid item>
        <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
          <span className={classes.cardContent}>
            <Typography color="primary" variant="h6">
              {stats?.active_cryptocurrencies}
            </Typography>
            <Typography variant="subtitle2" className={classes.stats}>
              # of Coins
            </Typography>
          </span>
        </Box>
      </Grid>

      <Grid item>
        <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
          <span className={classes.cardContent}>
            <Typography color="primary" variant="h6">
              {stats?.markets}
            </Typography>
            <Typography variant="subtitle2" className={classes.stats}>
              # of Markets
            </Typography>
          </span>
        </Box>
      </Grid>
      <Grid item>
        <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
          <span className={classes.cardContent}>
            <Typography color="primary" variant="h6">
              {stats?.ongoing_icos}
            </Typography>
            <Typography variant="subtitle2" className={classes.stats}>
              Ongoing ICOs
            </Typography>
          </span>
        </Box>
      </Grid>
      <Grid item>
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

          <Typography variant="subtitle2" className={classes.stats}>
            Dominance
          </Typography>
        </Box>
      </Grid>
      <Grid item>
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

          <Typography variant="subtitle2" className={classes.stats}>
            Dominance
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box boxShadow={3} bgcolor="background.paper" className={classes.card}>
          <Typography
            color="primary"
            style={{ paddingTop: "10px" }}
            variant="h6"
          >
            {gas?.average / 10} Gwei
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocalGasStationIcon fontSize="small" />
            <Typography variant="subtitle2" className={classes.stats} noWrap>
              ETH Gas
            </Typography>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Statcards;
