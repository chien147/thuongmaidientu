import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paypalisFetching: false,
    paypalSuccess: undefined,
    paypalError: false,
    //payment info
    infoFetching: false,
    infoSuccess: null,
    infoError: false,
    //VNpay payment
    vnpayIsFetching: false,
    vnpaySuccess: undefined,
    vnpayError: false,
    //order info
    orderFetching: false,
    dataOrder: [],
    orderError: false,
    //order detail info
    orderDetailFetching: false,
    dataOrderDetail: [],
    orderDetailError: false,
    //update order pending status
    orderPendingFetching: false,
    orderPendingSuccess: false,
    orderPendingError: false,
    //delete order
    deleteOrderFetching: false,
    deleteOrderSuccess: false,
    deleteOrderError: false,
  },
  reducers: {
    paymentPaypalStart: (state) => {
      state.paypalisFetching = true;
    },
    paymentPaypalSuccess: (state, action) => {
      state.paypalisFetching = false;
      state.paypalSuccess = action.payload;
    },
    paymentPaypalError: (state) => {
      state.paypalisFetching = false;
      state.paypalError = true;
    },
    //payment info
    paymentInfoStart: (state) => {
      state.infoFetching = true;
    },
    paymentInfoSuccess: (state, action) => {
      state.infoFetching = false;
      state.dataOrder.push(action.payload);
    },
    paymentInfoError: (state) => {
      state.infoFetching = false;
      state.infoError = true;
    },
    //payment vnpay
    paymentVNPayStart: (state) => {
      state.vnpayIsFetching = true;
    },
    paymentVNPaySuccess: (state, action) => {
      state.vnpayIsFetching = false;
      state.vnpaySuccess = action.payload;
    },
    paymentVNPayError: (state) => {
      state.vnpayIsFetching = false;
      state.vnpayError = true;
    },
    //order
    getOrderStart: (state) => {
      state.orderFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.orderFetching = false;
      state.dataOrder = action.payload;
    },
    getOrderError: (state) => {
      state.orderFetching = false;
      state.orderError = true;
    },

    //order detail
    getOrderDetailStart: (state) => {
      state.orderDetailFetching = true;
    },
    getOrderDetailSuccess: (state, action) => {
      state.orderDetailFetching = false;
      state.dataOrderDetail = action.payload;
    },
    getOrderDetailError: (state) => {
      state.orderDetailFetching = false;
      state.orderDetailError = true;
    },
    //order pending xu ly
    changeStatusOrderStart: (state) => {
      state.orderPendingFetching = true;
    },
    changeStatusOrderSuccess: (state, action) => {
      state.orderPendingFetching = false;
      // state.dataOrder = action.payload;
      const newStatus = action.payload;
      const idx = state.dataOrder.findIndex((prd) => prd.id === newStatus.id);
      if (idx > 0) {
        state.dataOrder[idx] = newStatus;
      }
    },
    changeStatusOrderError: (state) => {
      state.orderPendingFetching = false;
      state.orderPendingError = true;
    },
    // delete order

    deleteOrderStart: (state) => {
      state.deleteOrderFetching = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.deleteOrderFetching = false;
      state.deleteOrderSuccess = true;
      const removeIdOrder = action.payload;
      state.dataOrder = state.dataOrder.filter(
        (item) => item.id !== removeIdOrder
      );
    },
    deleteOrderError: (state) => {
      state.deleteOrderFetching = false;
      state.deleteOrderError = true;
    },
  },
});
export const {
  //payment paypal
  paymentPaypalStart,
  paymentPaypalSuccess,
  paymentPaypalError,
  //payment info
  paymentInfoStart,
  paymentInfoSuccess,
  paymentInfoError,
  //payment vnpay
  paymentVNPayStart,
  paymentVNPaySuccess,
  paymentVNPayError,
  //get all order
  getOrderStart,
  getOrderSuccess,
  getOrderError,
  //get order detail
  getOrderDetailStart,
  getOrderDetailSuccess,
  getOrderDetailError,
  //update pending order
  changeStatusOrderStart,
  changeStatusOrderSuccess,
  changeStatusOrderError,
  //delete order
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
