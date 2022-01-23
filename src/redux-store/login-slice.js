import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    setLogin(state, action) {
      const status = action.payload.status;
      const userData = action.payload.data;
      state.isLoggedIn = status;
      state.user = userData;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
