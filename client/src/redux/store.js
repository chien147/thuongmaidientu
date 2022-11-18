import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productModalReducer from "./product-modal/productModalSlice";
import productSlice from "./product/productSlice";
import categoryReducer from "./category/categorySlice";

import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";

import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import paymentReducer from "./payment/paymentSlice";
import orderReducer from "./order/orderSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  productModal: productModalReducer,
  products: productSlice,
  cartItems: cartItemsReducer,
  auth: authReducer,
  user: userReducer,
  cate: categoryReducer,
  payment: paymentReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: {
//     productModal: productModalReducer,
//     products: productSlice,
//     cartItems: cartItemsReducer,

//     auth: authReducer,
//     user: userReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
