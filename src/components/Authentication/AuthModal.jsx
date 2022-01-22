import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Button, Tab, Tabs } from "@material-ui/core";
import Login from "./Login";
import SignUp from "./SignUp";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
  },
  appBar: {
    backgroundColor: "transparent",
    color: "black", //change to white on theme switch
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        style={{
          width: 85,
          height: 40,
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static" className={classes.appBar}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{
                  borderRadius: 10,
                }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
