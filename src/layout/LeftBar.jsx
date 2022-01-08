import {
  Button,
  Container,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Home, MonetizationOn, Announcement } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    position: "fixed",
    boxShadow: "-3px 0 5px 0 #555",
    overflowX: "hidden",
    [theme.breakpoints.down("md")]: {
      width: "1rem",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
}));

const LeftBar = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Tooltip title="Home" placement="right">
          <IconButton>
            <Home />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.item}>
        <Tooltip title="Cryptocurrencies" placement="right">
          <IconButton>
            <MonetizationOn />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.item}>
        <Tooltip title="News" placement="right">
          <IconButton>
            <Announcement />
          </IconButton>
        </Tooltip>
      </div>
    </Container>
  );
};

export default LeftBar;
