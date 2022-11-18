import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    getCategory: {
      isFetching: false,
      category: [],
      error: false,
    },
  },
  reducers: {
    getCategoryStart: (state) => {
      state.getCategory.isFetching = true;
    },
    getCategorySuccess: (state, action) => {
      state.getCategory.isFetching = false;
      state.getCategory.category = action.payload;
    },
    getCategoryError: (state) => {
      state.getCategory.isFetching = false;
      state.getCategory.error = true;
    },
  },
});
export const { getCategoryStart, getCategorySuccess, getCategoryError } =
  categorySlice.actions;

export default categorySlice.reducer;
