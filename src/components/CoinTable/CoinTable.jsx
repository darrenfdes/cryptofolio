import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getCoinList } from "../../apis/coinGecko";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
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
} from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: "#555555",
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

const getCommaSeperatedNumber = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CoinTable = () => {
  const classes = useStyles();
  const currencyStore = useSelector((state) => state.currency.value);
  const currencySymbol = useSelector((state) => state.currency.symbol);
  const currency = currencyStore.toLowerCase();

  const [search, setSearch] = useState("");

  let navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(
    ["coinList", currency],
    () => getCoinList(currency)
  );

  if (isError) {
    return error.message;
  }

  const handleSearch = () => {
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  let i = 0;

  return (
    <Container className={classes.container}>
      <Typography
        variant="h4"
        style={{ marging: 18 }}
        className={classes.title}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
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
                    align={head === "#" || head === "Coin" ? "" : "right"}
                  >
                    <Typography variant="subtitle1">{head}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch().map((row) => (
                <TableRow
                  onClick={() => navigate(`/crypto/${row.id}`)}
                  key={row.id}
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
                        {++i}
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
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />

                      <Typography
                        variant="subtitle1"
                        style={{ paddingLeft: 20 }}
                      >
                        {row.name}
                      </Typography>
                      {/* <Typography variant="subtitle1">
                          {row.symbol}
                        </Typography> */}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      {currencySymbol}{" "}
                      {currency === "btc"
                        ? row.current_price.toFixed(6)
                        : getCommaSeperatedNumber(row.current_price.toFixed(2))}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: Number(
                          row.price_change_percentage_1h_in_currency < 0
                        )
                          ? "red"
                          : "green",
                      }}
                    >
                      {row.price_change_percentage_1h_in_currency.toFixed(2)}%
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: Number(
                          row.price_change_percentage_24h_in_currency < 0
                        )
                          ? "red"
                          : "green",
                      }}
                    >
                      {row.price_change_percentage_24h_in_currency.toFixed(2)}%
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: Number(
                          row.price_change_percentage_7d_in_currency < 0
                        )
                          ? "red"
                          : "green",
                      }}
                    >
                      {row.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      {getCommaSeperatedNumber(row.market_cap)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>
                      {currencySymbol}
                      {getCommaSeperatedNumber(row.total_volume)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default CoinTable;
