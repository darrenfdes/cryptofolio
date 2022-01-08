import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import currencySlice from "./currency-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, currency: currencySlice.reducer },
});

export default store;
