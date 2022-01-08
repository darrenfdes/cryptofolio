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
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { currencyActions } from "../redux-store/currency-slice";

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
}));

const currencyList = ["USD", "INR", "EUR"];
const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
};

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currencyStore = useSelector((state) => state.currency.value);

  console.log(typeof currencyStore);
  const currencyChangeHandler = (e) => {
    const currency = e.target.value;
    console.log(currency);
    dispatch(
      currencyActions.changeCurrency({
        value: currency,
        symbol: currencySymbols[currency],
      })
    );
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            CryptoFolio
          </Typography>
          <div style={{ display: "flex" }}>
            <Select
              color="primary"
              variant="outlined"
              labelId="demo-simple-select-label"
              value={currencyStore}
              style={{ width: 100, height: 40, marginLeft: 15, color: "white" }}
              onChange={currencyChangeHandler}
            >
              {currencyList.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
            <div className={classes.icons}>
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
              <Avatar alt="No Name" src="/static/images/avatar/2.jpg" />
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
