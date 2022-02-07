import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs, Typography } from "@material-ui/core";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase";
import { alertActions } from "../../redux-store/alert-slice";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  login: {
    width: 85,
    height: 40,
    backgroundColor: "#09064f",
    color: "white",
    "&:hover": {
      backgroundColor: "#070469",
    },
  },
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
  google: {
    padding: theme.spacing(2),
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
  tabs: {
    borderRadius: 10,
  },
}));

export default function AuthModal() {
  // const uiStore = useSelector((state) => state.ui.colorMode);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogleHandler = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        dispatch(
          alertActions.setAlert({
            open: true,
            message: "Sign in with google succesful!",
            type: "success",
          })
        );
        handleClose();
      })
      .catch((error) => {
        dispatch(
          alertActions.setAlert({
            open: true,
            message: error.message,
            type: "error",
          })
        );
        return;
      });
  };

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        onClick={handleOpen}
        className={classes.login}
      >
        <Typography>Login</Typography>
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
                textColor="primary"
                className={classes.tabs}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box className={classes.google}>
              <Typography>OR</Typography>
              <GoogleButton
                style={{ width: "100%" }}
                onClick={signInWithGoogleHandler}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
