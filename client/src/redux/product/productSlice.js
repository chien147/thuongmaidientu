import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], //all product
  product: [], //detail
  productByCate: [],
  totalProduct: 0,
  pending: false,
  error: false,
};

export const productSlice = createSlice({
  name: "productModal",

  initialState,
  reducers: {
    getProductStart: (state) => {
      state.pending = true;
    },
    getProductError: (state) => {
      state.pending = false;
      state.error = true;
    },
    getProductSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      const products = action.payload;
      state.products = products;
      state.totalProduct = products.length;
    },

    getDetailProductSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.product = action.payload;
    },
    //get product by category
    getProductByCateStart: (state) => {
      state.pending = true;
    },
    getProductByCateError: (state) => {
      state.pending = false;
      state.error = true;
    },
    getProductByCateSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.productByCate = action.payload;
    },
    //add product
    addProductStart: (state) => {
      state.pending = true;
    },
    addProductError: (state) => {
      state.pending = false;
      state.error = true;
    },
    addProductSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.products.push(action.payload);
    },

    // Delete
    deleteProductStart: (state) => {
      state.pending = true;
    },
    deleteProductError: (state) => {
      state.pending = false;
      state.error = true;
    },
    deleteProductSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      const removeIdProduct = action.payload;
      state.products = state.products.filter(
        (item) => item.id !== removeIdProduct
      );
      state.totalProduct = state.products.length;
    },
    //update
    updateStart: (state) => {
      state.pending = true;
    },
    updateError: (state) => {
      state.pending = false;
      state.error = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      const newProduct = action.payload;
      const idx = state.products.findIndex((prd) => prd.id === newProduct.id);
      if (idx > 0) {
        state.products[idx] = newProduct;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  //get all
  getProductStart,
  getProductError,
  getProductSuccess,
  //get detail
  getDetailProductSuccess,
  //get by cate
  getProductByCateStart,
  getProductByCateError,
  getProductByCateSuccess,
  //add
  addProductStart,
  addProductError,
  addProductSuccess,
  //delete
  deleteProductStart,
  deleteProductError,
  deleteProductSuccess,
  //update
  updateStart,
  updateError,
  updateSuccess,
} = productSlice.actions;

export default productSlice.reducer;
