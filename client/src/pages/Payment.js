import { makeStyles } from "@material-ui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getUser,
  paymentInfo,
  paymentPaypal,
  paymentVNPay,
} from "../redux/apiRequest";

import { v4 as uuidv4 } from "uuid";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Typography } from "@mui/material";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton";

import axios from "axios";
import Loading from "../components/Loading";

const Payment = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const useStyles = makeStyles((theme) => ({
    marginBottonf: {
      marginBotton: "20px",
    },
  }));
  const classes = useStyles();

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.currentUser);
  const userProfile = useSelector((state) => state.auth.currentUser);
  console.log("payment page userProfile", userProfile);
  const isFetching = useSelector((state) => state.user.isFetching);
  const cartItems = useSelector((state) => state.cartItems.value);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

  const productInfoPayment = cartItems.map((item) => {
    return {
      product: {
        price: item.price,
        name: item.name,
        quantity: item.quantity,
        subTotalPrice: totalPrice,
      },
      subTotalPrice: totalPrice,
    };
  });

  const [name, setName] = useState(userProfile?.username);
  const [mail, setEmail] = useState(userProfile?.email);
  const [address, setAddress] = useState(userProfile?.address);
  const [phone, setPhone] = useState(userProfile?.phone);

  useEffect(() => {
    if (user?.token) getUser(user?.token, dispatch);
  }, []);
  const [rate, setRate] = useState(null);
  const [code, setCode] = useState(null);

  useEffect(() => {
    const exchangerate = async () => {
      try {
        const res = await axios.get(
          "https://api.exchangerate.host/latest?base=VND&&symbols=USD"
        );
        setRate(res.data.rates);
      } catch (err) {
        console.log(err);
      }
    };
    exchangerate();
  }, []);

  const handlePaypal = () => {
    if (method === "PAYPAL") {
      console.log("cartItems: ", cartItems);
      let arr = [];

      const x = uuidv4();
      cartItems.map((item, idx) => {
        const x = {
          quantity: item.quantity,
          size: item.size,
          productId: item.idProduct,
        };
        arr.push(x);
      });

      const paymentOrderDetail = {
        customerId: user.id,
        customerPhone: user.phone,
        customerName: name,
        customerAddress: user.address,
        customerEmail: user.email,
        payment: method,
        paymentInfo: `Thanh toan voi ${method}`,
        message: "la la la 01",
        code: x,
        productorder: arr,
      };
      const info = {
        total: totalPrice * rate.USD,
        paymentInfo: "thanh toan voi paypal",
        code: x,
      };
      console.log("method ", method);
      console.log("paymentOrderDetail ", paymentOrderDetail);
      paymentInfo(paymentOrderDetail, dispatch, history);
      paymentPaypal(info, dispatch, history);
    } else if (method === "VNPAY") {
      console.log("cartItems: ", cartItems);

      let arr = [];

      const y = uuidv4();
      cartItems.map((item, idx) => {
        const x = {
          quantity: item.quantity,
          size: item.size,
          productId: item.idProduct,
        };
        arr.push(x);
      });

      const paymentOrderDetail = {
        customerId: user.id,
        customerPhone: user.phone,
        customerName: name,
        customerAddress: user.address,
        customerEmail: user.email,
        payment: method,
        paymentInfo: `Thanh toan voi ${method}`,
        message: "la la la 01",
        code: y,
        productorder: arr,
      };
      const info = {
        total: totalPrice,
        paymentInfo: "thanh toan voi vnpay",
        code: y,
      };
      console.log("method", method);

      paymentInfo(paymentOrderDetail, dispatch, history);
      paymentVNPay(info, dispatch, history);
    } else if (method === "COD") {
      console.log("cartItems: ", cartItems);
      console.log("method", method);

      let arr = [];

      const y = uuidv4();
      cartItems.map((item, idx) => {
        const x = {
          quantity: item.quantity,
          size: item.size,
          productId: item.idProduct,
        };
        arr.push(x);
      });

      const paymentOrderDetail = {
        customerId: user.id,
        customerPhone: user.phone,
        customerName: name,
        customerAddress: user.address,
        customerEmail: user.email,
        payment: method,
        paymentInfo: `Thanh toan voi ${method}`,
        message: "la la la 01",
        code: y,
        productorder: arr,
      };

      paymentInfo(paymentOrderDetail, dispatch, history);
    }
  };

  const [method, setMethod] = React.useState("");

  const handleChangeMethod = (event) => {
    setMethod(event.target.value);
  };

  return (
    <Grid container flex spacing={2}>
      <Grid item xs={5}>
        <h3 className="payment-title">Thông tin nhận hàng</h3>
        <Item>
          <TextField
            value={name}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Dia chi"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="SDT"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Item>
      </Grid>
      <Grid item xs={2}>
        <h3 className="payment-title">Phương thức thanh toán</h3>
        <Item>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Phuong thuc thanh toan
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={method}
                    label="Method"
                    onChange={(e) => handleChangeMethod(e)}
                  >
                    <MenuItem value="COD">COD</MenuItem>
                    <MenuItem value="VNPAY">VNPAY</MenuItem>
                    <MenuItem value="PAYPAL">PAYPAL</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className="paypal-container-button">
                <PaypalCheckoutButton onClick={handlePaypal} />
              </div>
            </FormControl>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={4}>
        <h3 className="payment-title">Thông tin sản phẩm</h3>
        <Item>
          {cartItems.map((item, idx) => (
            <div key={idx} className="payment-product-container">
              <div className="payment-product-name">{`${item.name} - ${item.size}`}</div>
              <div className="payment-product-image">
                <img src={item.image} alt="deo co" />
              </div>
              <div className="payment-product-qty"> {item.quantity}</div>
              <div className="payment-product-price">{item.price}</div>
            </div>
          ))}
          <div className="payment-product-total">
            <Typography>Tổng cộng</Typography>
            <Typography>{totalPrice}</Typography>
          </div>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Payment;
