import {
  AppBar,
  Badge,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
// import Notification from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { currencyActions } from "../redux-store/currency-slice";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/Authentication/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import UserMenu from "../components/Authentication/UserMenu";
import { alertActions } from "../redux-store/alert-slice";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#070542",
  },
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
  toggle: {
    color: theme.palette.text.primary,
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

  const [user, loading, error] = useAuthState(auth);

  const currencyChangeHandler = (e) => {
    const currency = e.target.value;
    dispatch(
      currencyActions.changeCurrency({
        value: currency,
        symbol: currencySymbols[currency],
      })
    );
  };

  if (error) {
    dispatch(
      alertActions.setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    );
  }

  let navigate = useNavigate();

  return (
    <AppBar position="static" className={classes.root}>
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
                navigate("/crypto");
              }}
              className={classes.news}
            >
              Coins
            </Typography>
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
              {!loading && <>{user ? <UserMenu /> : <AuthModal />}</>}

              {/* <Badge
                badgeContent={4}
                color="secondary"
                className={classes.badge}
              >
                <Notification />
              </Badge> */}
              <Badge className={classes.badge}>
                <Tooltip title="toggle light/dark theme">
                  <IconButton className={classes.toggle}>
                    <Brightness4Icon style={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Badge>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
