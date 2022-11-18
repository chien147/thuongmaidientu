import { createSlice } from "@reduxjs/toolkit";
const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  value: items,
  currentUser: null,
  isFetching: null,
  error: false,

  loginFetching: null,

  logout: {
    isFetching: false,
    error: false,
    success: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loginFetching = true;
    },

    loginSucess: (state, action) => {
      state.loginFetching = false;
      window.localStorage.clear();
      state.currentUser = action.payload;
    },

    loginFailed: (state, action) => {
      state.loginFetching = false;
      state.error = true;
    },

    registerStart: (state) => {
      state.isFetching = true;
    },

    registerSuccess: (state, action) => {
      state.isFetching = false;
      //   state.currentUser = action.payload;
    },

    registerFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },

    logoutStart: (state) => {
      state.isFetching = true;
      // state.logout.success = false;
    },

    logoutSucess: (state, action) => {
      state.isFetching = true;
      state.currentUser = null;
      // state.logout.success = true;
    },

    logoutFailed: (state, action) => {
      state.logout.isFetching = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginSucess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSucess,
  logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
