import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./sass/index.scss";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./components/Layout";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AWCwAG1B2g09Z95vR_S1SdCTxS7Y4il6R6blE-uW_VVynOIupwxAd-nhLUyf1b8ljOYyOoOQNFIN8NPC",
          }}
        >
          <Layout />
          <ToastContainer />
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
