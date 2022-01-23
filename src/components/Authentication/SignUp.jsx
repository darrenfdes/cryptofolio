import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import { alertActions } from "../../redux-store/alert-slice";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";

const SignUp = ({ handleClose }) => {
  const dispatch = useDispatch();

  const {
    value: email,
    valueIsValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );

  const {
    value: password,
    hasError: passwordInputHasError,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value?.trim().length >= 6);

  const {
    value: confirmPassword,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value?.trim() === password);

  const handleSubmit = async () => {
    if (!passwordIsValid || !emailIsValid) {
      dispatch(
        alertActions.setAlert({
          open: true,
          message: "Please enter email and password ",
          type: "error",
        })
      );
      return;
    } else if (!emailIsValid) {
      dispatch(
        alertActions.setAlert({
          open: true,
          message: "Please Enter a valid email :(",
          type: "error",
        })
      );
      return;
    } else if (!passwordIsValid) {
      dispatch(
        alertActions.setAlert({
          open: true,
          message: "Please enter password :(",
          type: "error",
        })
      );
      return;
    } else if (password !== confirmPassword) {
      dispatch(
        alertActions.setAlert({
          open: true,
          message: "Passwords do not match",
          type: "error",
        })
      );
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(
        alertActions.setAlert({
          open: true,
          message: `Sign Up Successful for ${result.user.email}!`,
          type: "success",
          user: result.user,
        })
      );

      handleClose();
    } catch (error) {
      dispatch(
        alertActions.setAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
    }

    resetEmail();
    resetPassword();
    resetConfirmPassword();

    return;
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <FormControl>
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          fullWidth
          error={emailInputHasError}
        />
        {emailInputHasError && (
          <FormHelperText style={{ color: "red", paddingLeft: 2 }}>
            Please enter a valid email
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          fullWidth
          error={passwordInputHasError}
        />
        {passwordInputHasError && (
          <FormHelperText style={{ color: "red", paddingLeft: 2 }}>
            Please enter a password with more than 6 characters
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          variant="outlined"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          fullWidth
          error={confirmPasswordInputHasError}
        />
        {confirmPasswordInputHasError && (
          <FormHelperText style={{ color: "red", paddingLeft: 2 }}>
            Password does not match!
          </FormHelperText>
        )}
      </FormControl>

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
