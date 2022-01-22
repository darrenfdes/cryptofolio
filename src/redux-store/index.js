import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import currencySlice from "./currency-slice";
import loginSlice from "./login-slice";
import alertSlice from "./alert-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    currency: currencySlice.reducer,
    login: loginSlice.reducer,
    alert: alertSlice.reducer,
  },
});

export default store;
