import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 123,
    date: "2025-03-10",
    edit: false,
    data: [{ name: "pirmas", value: 50 }],
  },
];

export const taxesSlice = createSlice({
  name: "taxes",
  initialState,
  reducers: {
    getTaxes: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { getTaxes } = taxesSlice.actions;

export default taxesSlice.reducer;
