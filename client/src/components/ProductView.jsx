import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
import { InlineShareButtons } from "sharethis-reactjs";

import { useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

import { remove } from "../redux/product-modal/productModalSlice";
import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import numberWithCommas from "../utils/numberWithCommas";

import Button from "./Button";
import Loading from "./Loading";

const ProductView = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cartItems.value);
  let product = props.product;

  if (product === undefined) {
    product = {
      idProduct: null,
      name: "",
      price: 0,
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };
  }

  const [previewImg, setPreviewImg] = useState(null);
  const [descriptionExpand, setDescriptionExpand] = useState(true);
  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [name, setName] = useState(product.name);
  const [idProduct, setIdProduct] = useState(product.id);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
    setName(product.name);
    setName(product.name);
    setIdProduct(product.id);
  }, [product]);

  const check = () => {
    if (size === undefined) {
      alert("Vui lòng chọn kích cỡ!");
      return false;
    }
    return true;
  };

  const addToCart = () => {
    if (check()) {
      let newItem = {
        idProduct: product.id,
        slug: product.code,
        color: color,
        size: size,
        // price: product.price,
        price: product.price - (product.price * product.discount) / 100,
        quantity: quantity,
        name: name,
        image: previewImg,
      };
      if (dispatch(addItem(newItem))) {
        alert("Success");
      } else {
        alert("Fail");
      }
    }
  };

  const goToCart = () => {
    if (check()) {
      let newItem = {
        idProduct: product.id,
        slug: product.code,
        name: product.name,
        color: color,
        size: size,
        // price: product.price,
        price: product.price - (product.price * product.discount) / 100,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        dispatch(remove());
        history.push("/cart");
      } else {
        alert("Fail");
      }
    }
  };

  return (
    <>
      <div className="product">
        <div className="product__images">
          <div className="product__images__list">
            <div
              className="product__images__list__item"
              onClick={() => setPreviewImg(product.image)}
            >
              {/* <img src={product.image} alt="" /> */}
            </div>
            <div
              className="product__images__list__item"
              onClick={() => setPreviewImg(product.image)}
            >
              {/* <img src={product.image} alt="" /> */}
            </div>
          </div>
          <div className="product__images__main">
            <img src={previewImg} alt="" />
          </div>
          <div
            className={`product-description ${
              descriptionExpand ? "expand" : ""
            }`}
          >
            <div className="product-description__title">Chi tiết sản phẩm</div>
            <div
              className="product-description__content"
              dangerouslySetInnerHTML={{ __html: product.shortDetails }}
              style={{ marginBottom: "10px" }}
            ></div>
            <div className="product-description__toggle">
              <Button
                size="sm"
                onClick={() => setDescriptionExpand(!descriptionExpand)}
              >
                {descriptionExpand ? "Xem thêm" : "Thu gọn"}
              </Button>
            </div>
          </div>
        </div>
        <div className="product__info">
          <h1 className="product__info__title">{product.name}</h1>
          <div className="product__info__item">
            <span className="product__info__item__price">
              {numberWithCommas(
                product.price - (product.price * product.discount) / 100
              )}
            </span>
          </div>

          <div className="product__info__item">
            <div className="product__info__item__title">Share</div>
            <div className="product__info__item__list">
              <InlineShareButtons
                config={{
                  alignment: "center", // alignment of buttons (left, center, right)
                  color: "social", // set the color of buttons (social, white)
                  enabled: true, // show/hide buttons (true, false)
                  font_size: 16, // font size for the buttons
                  labels: "cta", // button labels (cta, counts, null)
                  language: "en", // which language to use (see LANGUAGES)
                  networks: [
                    // which networks to include (see SHARING NETWORKS)

                    "messenger",
                    "facebook",
                    "twitter",
                  ],
                  padding: 12, // padding within buttons (INTEGER)
                  radius: 4, // the corner radius on each button (INTEGER)
                  show_total: true,
                  size: 25, // the size of each button (INTEGER)

                  url: window.location.href, // (defaults to current url)
                }}
              />
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">Kích cỡ</div>
            <div className="product__info__item__list">
              {product.sizes?.map((item, index) => (
                <div
                  key={index}
                  className={`product__info__item__list__item ${
                    size === item ? "active" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  <span className="product__info__item__list__item__size">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">Số lượng</div>
            <div className="product__info__item__quantity">
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("minus")}
              >
                <i className="bx bx-minus"></i>
              </div>
              <div className="product__info__item__quantity__input">
                {quantity}
              </div>
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("plus")}
              >
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </div>
          <div className="product__info__item">
            <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
            <Button onClick={() => goToCart()}>mua ngay</Button>
          </div>
        </div>
        <div
          className={`product-description mobile ${
            descriptionExpand ? "expand" : ""
          }`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.shortDetails }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
// export default ProductView;
