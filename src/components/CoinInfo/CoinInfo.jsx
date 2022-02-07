import {
  Button,
  ButtonGroup,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getHistoricalCahrtData } from "../../apis/coinGecko";
import { Line } from "react-chartjs-2";
import { chartDays } from "./ChartTimePeriods.js";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coin, currency, symbol }) => {
  const classes = useStyles();
  const [historicalData, setHistoricalData] = useState();

  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getHistoricalCahrtData(coin.id, days, currency);

      setHistoricalData(data.prices);
    };

    fetchData();
  }, [coin.id, currency, days]);

  // const getChartColor = () => {
  //   if (historicalData[0][1] > historicalData[-1][1]) {
  //     return "#c90407";
  //   } else {
  //     return "#149629";
  //   }
  // };

  return (
    <div className={classes.container}>
      {!historicalData ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#335cff",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  variant={day.value === days ? "contained" : ""}
                  onClick={() => setDays(day.value)}
                >
                  {day.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
