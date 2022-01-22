import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import React from "react";
import useInput from "../../hooks/use-input";

const Login = () => {
  const {
    value: email,
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
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value?.trim() !== "");

  const handleSubmit = (e) => {
    resetEmail();
    resetPassword();
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
            Please enter a password
          </FormHelperText>
        )}
      </FormControl>

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
