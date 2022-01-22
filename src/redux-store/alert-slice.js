import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "login",
  initialState: {
    open: false,
    message: "No message",
    type: "",
  },
  reducers: {
    setAlert(state, action) {
      const message = action.payload.message;
      const type = action.payload.type;
      state.open = action.payload.open;
      state.message = message;
      state.type = type;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
