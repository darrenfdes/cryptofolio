import {
  AppBar,
  Badge,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Notification from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { useDispatch, useSelector } from "react-redux";
import { currencyActions } from "../redux-store/currency-slice";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/Authentication/AuthModal";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    cursor: "pointer",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    marginRight: theme.spacing(2),
  },
  news: {
    paddingRight: theme.spacing(2),
    cursor: "pointer",
  },
  currency: {
    width: 100,
    height: 40,
    paddingRight: theme.spacing(2),
    color: "white",
  },
}));

const currencyList = ["USD", "INR", "EUR", "BTC"];
const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  BTC: "₿",
};

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currencyStore = useSelector((state) => state.currency.value);

  const currencyChangeHandler = (e) => {
    const currency = e.target.value;
    dispatch(
      currencyActions.changeCurrency({
        value: currency,
        symbol: currencySymbols[currency],
      })
    );
  };

  let navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              navigate("/");
            }}
          >
            CryptoFolio
          </Typography>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              onClick={() => {
                navigate("/news");
              }}
              className={classes.news}
            >
              News
            </Typography>
            <Select
              color="primary"
              variant="outlined"
              labelId="demo-simple-select-label"
              value={currencyStore}
              className={classes.currency}
              onChange={currencyChangeHandler}
            >
              {currencyList.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
            <div className={classes.icons}>
              <AuthModal />
              <Badge
                badgeContent={4}
                color="secondary"
                className={classes.badge}
              >
                <Notification />
              </Badge>
              <Badge className={classes.badge}>
                <Brightness4Icon />
              </Badge>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
