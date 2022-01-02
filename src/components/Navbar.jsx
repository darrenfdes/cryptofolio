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
import React from "react";
import Notification from "@material-ui/icons/Notifications";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Avatar from "@material-ui/core/Avatar";

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

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            CryptoFolio
          </Typography>
          <div>
            <Select>
              <MenuItem>USD</MenuItem>
              <MenuItem>INR</MenuItem>
              <MenuItem>EUR</MenuItem>
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
