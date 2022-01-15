import React from "react";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import { Card, Container, Typography } from "@material-ui/core";
import { FaCoins } from "react-icons/fa";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    minHeight: 150,
  },
  icon: {
    minHeight: 80,
  },
  card: {
    margin: "-150px",
    float: "left",
    perspective: "500px",
  },
  content: {
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
}));

const Statcards = ({ stats }) => {
  const classes = useStyles();

  console.log(stats);
  return (
    <Container className={classes.container}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi,
      tempore totam sint sunt culpa eius quisquam beatae? Dignissimos expedita,
      dicta iste perferendis enim rem aperiam culpa quaerat doloremque tempora
      recusandae!
    </Container>
  );
};

export default Statcards;
