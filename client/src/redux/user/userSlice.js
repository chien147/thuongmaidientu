import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.isFetching = true;
    },

    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.push(action.payload);
    },

    getUserFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserFailed } =
  userSlice.actions;
export default userSlice.reducer;
