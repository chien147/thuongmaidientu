import axios from "axios";
import cateApi from "../api/cateApi";
import productApi from "../api/productApi";

import {
  addProductError,
  //add
  addProductStart,
  addProductSuccess,
  deleteProductError,
  // Delete
  deleteProductStart,
  deleteProductSuccess,
  //get detail
  getDetailProductSuccess,
  getProductByCateError,
  //get by cate
  getProductByCateStart,
  getProductByCateSuccess,
  getProductError,
  getProductStart,
  getProductSuccess,
  updateError,
  //update
  updateStart,
  updateSuccess,
} from "./product/productSlice";

import {
  loginFailed,
  loginStart,
  loginSucess,
  logoutFailed,
  logoutStart,
  logoutSucess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./auth/authSlice";
import {
  getCategoryError,
  getCategoryStart,
  getCategorySuccess,
} from "./category/categorySlice";

import {
  //payment info
  paymentInfoError,
  paymentInfoStart,
  paymentInfoSuccess,
  //payment paypal info
  paymentPaypalError,
  paymentPaypalStart,
  paymentPaypalSuccess,
  //payment vn payment
  paymentVNPayStart,
  paymentVNPaySuccess,
  paymentVNPayError,
  //order
  getOrderStart,
  getOrderSuccess,
  getOrderError,
  //getDetail order
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
} from "./payment/paymentSlice";

import { getUserFailed, getUserStart, getUserSuccess } from "./user/userSlice";
// import {
//   getOrderError,
//   getOrderStart,
//   getOrderSuccess,
// } from "./order/orderSlice";
import orderApi from "../api/orderApi";

// get all product
export const getAllProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    // const res = await productApi.getAll();
    // console.log(res);
    const res = await axios.get("https://yoloshopapi.herokuapp.com/Product");
    console.log("api_resquest", res.data);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductError());
  }
};

export const getDetailProduct = async (dispatch, slug) => {
  dispatch(getProductStart());
  try {
    const res = await productApi.getDetail(slug);
    dispatch(getDetailProductSuccess(res));
  } catch (err) {
    dispatch(getProductError());
  }
};

// login

export const loginUser = async (user, dispatch, history) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://yoloshopapi.herokuapp.com/auth/signin",
      user
    );
    dispatch(loginSucess(res.data));
    history.push("/");
  } catch (err) {
    console.log(err);
    dispatch(loginFailed());
  }
};

export const registerUser = async (userRegister, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "https://yoloshopapi.herokuapp.com/auth/signup",
      userRegister
    );
    dispatch(registerSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(registerFailed());
  }
};
//get user when after login

export const getUser = async (token, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(
      "https://yoloshopapi.herokuapp.com/User/Profile",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getUserFailed());
  }
};

export const logOut = async (dispatch, history) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSucess());
    history.push("/login");
  } catch (err) {
    console.log(err);
    dispatch(logoutFailed());
  }
};
//get category
export const getAllCate = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await cateApi.getAll();
    dispatch(getCategorySuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getCategoryError());
  }
};

export const getProductByCate = async (slug, dispatch) => {
  dispatch(getProductByCateStart());
  try {
    const res = await productApi.getProductByCate(slug);
    dispatch(getProductByCateSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getProductByCateError(err));
  }
};
//add product
export const addNewProduct = async (history, dispatch, newProduct) => {
  dispatch(addProductStart());
  try {
    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("shortDes", newProduct.shortDes);
    formData.append("shortDetails", "xin chao");
    formData.append("file", newProduct.file);
    formData.append("quantity", 100);
    formData.append("discount", 10);
    formData.append("view", 1);
    formData.append("categoryName", newProduct.categoryName);
    formData.append("size", ["s", "m"]);

    console.log(newProduct);
    const res = await axios.post(
      "https://yoloshopapi.herokuapp.com/Product",
      formData
    );
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(addProductError());
  }
};

// Delete
export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    let _id = JSON.stringify(id);
    axios({
      method: "DELETE",
      url: "https://yoloshopapi.herokuapp.com/Product",
      data: _id,
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      dispatch(deleteProductSuccess(id));
    });
  } catch (err) {
    console.log(err);
    dispatch(deleteProductError());
  }
};

//update
export const updateProduct = async (dispatch, newProduct) => {
  dispatch(updateStart());
  try {
    const formData = new FormData();

    formData.append("id", newProduct.id);
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("shortDes", newProduct.shortDes);
    formData.append("shortDetails", "xin chao");
    formData.append("file", newProduct.file);
    formData.append("quantity", 100);
    formData.append("discount", 10);
    formData.append("view", 1);
    formData.append("categoryName", newProduct.categoryName);
    formData.append("size", ["s", "m"]);

    const res = await axios.put(
      "https://yoloshopapi.herokuapp.com/Product",
      formData
    );
    console.log(res.data);

    dispatch(updateSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(updateError());
  }
};

// payment paypal
export const paymentPaypal = async (info, dispatch, history) => {
  dispatch(paymentPaypalStart());
  try {
    const res = await axios.post(
      "https://yoloshopapi.herokuapp.com/paypal",
      info
    );
    dispatch(paymentPaypalSuccess());
    // console.log("res.data paypal", res.data);
    window.location = res.data;
  } catch (err) {
    console.log(err);
    dispatch(paymentPaypalError());
  }
};
//payment info
export const paymentInfo = async (paymentOrderDetail, dispatch, history) => {
  dispatch(paymentInfoStart());
  console.log(paymentOrderDetail);
  try {
    const res = await axios.post(
      "https://yoloshopapi.herokuapp.com/Payment",
      paymentOrderDetail
    );

    if (paymentOrderDetail.payment === "COD") {
      dispatch(paymentInfoSuccess(res.data));
      history.push("/payment-success");
      localStorage.setItem("cartItems", []);
    } else {
      dispatch(paymentInfoSuccess(res.data));
    }
  } catch (err) {
    console.log(err);
    dispatch(paymentInfoError());
  }
};
//vnpay
export const paymentVNPay = async (info, dispatch, history) => {
  dispatch(paymentVNPayStart());
  try {
    const res = await axios.post(
      "https://yoloshopapi.herokuapp.com/vnpay",
      info
    );
    dispatch(paymentVNPaySuccess());
    console.log("res.data ", res.data);
    window.location = res.data;
  } catch (err) {
    console.log(err);
    dispatch(paymentVNPayError());
  }
};

//get all order
export const getAllOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await orderApi.getAll();

    dispatch(getOrderSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getOrderError());
  }
};

//get order detail
export const getOrderDetail = async (id, dispatch) => {
  dispatch(getOrderDetailStart());
  try {
    console.log("id detail order: ", id);
    const res = await orderApi.getDetail(id);
    console.log("res detail order: ", res);
    dispatch(getOrderDetailSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getOrderDetailError());
  }
};
//update pending orders
export const updatePendingOrder = async (id, dispatch) => {
  dispatch(changeStatusOrderStart());
  console.log("updatePendingOrder id: ", id);
  let _id = JSON.stringify(id);
  try {
    axios({
      method: "PUT",
      url: "https://yoloshopapi.herokuapp.com/OrderStatus",
      data: _id,
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      dispatch(changeStatusOrderSuccess(res.data));
      console.log(res.data);
    });
  } catch (err) {
    console.log(err);
    dispatch(changeStatusOrderError());
  }
};
//Delete order

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    let _id = JSON.stringify(id);
    axios({
      method: "DELETE",
      url: "https://yoloshopapi.herokuapp.com/Order",
      data: _id,
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      dispatch(deleteOrderSuccess(id));
      console.log(res.data);
    });
  } catch (err) {
    console.log(err);
    dispatch(deleteOrderError());
  }
};
