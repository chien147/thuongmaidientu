import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Button from "../components/Button";
import CartItem from "../components/CartItem";
import Helmet from "../components/Helmet";

// import { getAllProduct } from "../redux/apiRequest";
import numberWithCommas from "../utils/numberWithCommas";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state) => state.products.products);

  // useEffect(() => {
  //   // getAllProduct(dispatch);
  // }, [dispatch]);
  const cartItems = useSelector((state) => state.cartItems.value);

  const getProductBySlug = (slug) => products.find((e) => e.code === slug);

  const getCartItemsInfo = (cartItems) => {
    let res = [];
    if (cartItems.length > 0) {
      cartItems.forEach((e) => {
        let product = getProductBySlug(e.slug);
        res.push({
          ...e,
          product: product,
        });
      });
    }
    return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  };

  const [cartProducts, setCartProducts] = useState(getCartItemsInfo(cartItems));

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(getCartItemsInfo(cartItems));
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

  console.log("cartItems cart page: ", cartItems);

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block" onClick={() => history.push("/payment")}>
              Đặt hàng
            </Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
