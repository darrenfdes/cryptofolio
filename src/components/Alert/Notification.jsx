import { Snackbar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../redux-store/alert-slice";
import MuiAlert from "@material-ui/lab/Alert";

const Notification = () => {
  const alertMessage = useSelector((state) => state.alert.message);
  const isOpen = useSelector((state) => state.alert.open);
  const alertType = useSelector((state) => state.alert.type);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    dispatch(
      alertActions.setAlert({
        open: false,
        message: alertMessage,
        type: alertType,
      })
    );
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alertType}
      >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
