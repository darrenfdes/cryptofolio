import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getCoinList } from "../../apis/coinGecko";
import { getCryptoStats } from "../../apis/coinGecko";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import Statcards from "./Statcards";
import {
  Container,
  LinearProgress,
  makeStyles,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TextField,
  Typography,
  Switch,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  textField: {
    marginBottom: 20,
    width: "100%",
  },
  rowNumber: {
    marginLeft: theme.spacing(3),
  },
  star: {
    "&:hover": {
      color: "#fcba03",
    },
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f7f7f7",
    },
  },
  stats: {
    color: theme.palette.text.secondary,
  },
}));

const tableHeaders = [
  "#",
  "Coin",
  "Price",
  "1h",
  "24h",
  "7d",
  "Market Cap",
  "24h volume",
];

export const getCommaSeperatedNumber = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CoinTable = () => {
  const classes = useStyles();
  const currencyStore = useSelector((state) => state.currency.value);
  const currencySymbol = useSelector((state) => state.currency.symbol);
  const currency = currencyStore.toLowerCase();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [checked, setChecked] = useState(false);

  let navigate = useNavigate();

  const {
    data: stats,
    isError: statError,
    error: statErrObj,
  } = useQuery("stats", getCryptoStats);

  const globalStats = stats?.data.data;

  const { data, isLoading, isError, error } = useQuery(
    ["coinList", currency],
    () => getCoinList(currency)
  );

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

  //get crypto stats

  if (statError) {
    return statErrObj.message();
  }

  if (isError) {
    return error.message;
  }

  const handleSearch = () => {
    for (let i = 0; i < data?.length; i++) {
      data[i].number = i + 1;
    }
    return data?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" style={{ margin: 18 }} className={classes.title}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          varaint="subtitle2"
          className={classes.stats}
          style={{ paddingBottom: "2px" }}
        >
          The global cryptocurrency market cap had a{" "}
          <span
            style={{
              color:
                Number(globalStats?.market_cap_change_percentage_24h_usd) < 0
                  ? "red"
                  : "green",
            }}
          >
            {globalStats?.market_cap_change_percentage_24h_usd?.toFixed(2)}%
          </span>{" "}
          increase over the last 24h
        </Typography>
        <Switch
          size="small"
          color="primary"
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        <Typography variant="subtitle2" className={classes.stats}>
          Show Stats
        </Typography>
      </span>
      {checked && (
        <span style={{ paddingBottom: "15px", paddingTop: "15px" }}>
          <Statcards stats={globalStats} gas={gas} />
        </span>
      )}
      <TextField
        label="Search for a cryptocurrency"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        {isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map((head) => (
                  <TableCell
                    style={{ fontWeight: "700" }}
                    key={head}
                    align={
                      head === "#" || head === "Coin"
                        ? head === "Coin"
                          ? "inherit"
                          : "center"
                        : "right"
                    }
                  >
                    <Typography variant="subtitle1">{head}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => (
                  <TableRow
                    onClick={() => navigate(`/crypto/${row.id}`)}
                    key={row.id}
                    className={classes.row}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      styles={{ display: "flex", gap: 15 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <StarOutlineIcon className={classes.star} />
                        <Typography
                          variant="subtitle1"
                          className={classes.rowNumber}
                        >
                          {row?.number}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <div
                        style={{
                          display: "flex",

                          alignItems: "center",
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row?.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />

                        <Typography
                          variant="subtitle1"
                          style={{ paddingLeft: 20 }}
                        >
                          {row?.name}
                        </Typography>
                        {/* <Typography variant="subtitle1">
                          {row.symbol}
                        </Typography> */}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        {currencySymbol}
                        {currency === "btc"
                          ? row?.current_price?.toFixed(6)
                          : getCommaSeperatedNumber(
                              row?.current_price?.toFixed(2)
                            )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="subtitle1"
                        style={{
                          color: Number(
                            row?.price_change_percentage_1h_in_currency < 0
                          )
                            ? "red"
                            : "green",
                        }}
                      >
                        {row?.price_change_percentage_1h_in_currency?.toFixed(
                          2
                        )}
                        %
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="subtitle1"
                        style={{
                          color: Number(
                            row?.price_change_percentage_24h_in_currency < 0
                          )
                            ? "red"
                            : "green",
                        }}
                      >
                        {row?.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}
                        %
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="subtitle1"
                        style={{
                          color: Number(
                            row?.price_change_percentage_7d_in_currency < 0
                          )
                            ? "red"
                            : "green",
                        }}
                      >
                        {row?.price_change_percentage_7d_in_currency?.toFixed(
                          2
                        )}
                        %
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        {currencySymbol}
                        {getCommaSeperatedNumber(row?.market_cap)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        {currencySymbol}
                        {getCommaSeperatedNumber(row?.total_volume)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        count={(handleSearch()?.length / 10)?.toFixed(0)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default CoinTable;
