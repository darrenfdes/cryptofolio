import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    value: "USD",
    symbol: "$",
  },
  reducers: {
    changeCurrency(state, action) {
      state.value = action.payload;
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;
