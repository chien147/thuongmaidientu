import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ProductView from "./ProductView";

import Button from "./Button";

import { remove } from "../redux/product-modal/productModalSlice";

const ProductViewModal = () => {
  //   const dispatch = useDispatch();
  //   // const products = useSelector((state) => state.products?.products);
  //   const _products = useSelector((state) => state.products?.products);

  //   const productSlug = useSelector((state) => state.productModal.value);

  //   const getProductBySlug = (slug) => products.find(e => e.slug === slug)

  //   useEffect(() => {
  //     getAllProduct(dispatch);
  //     getDetailProduct(dispatch, productSlug);
  //   }, [dispatch, productSlug]);

  //   const [product, setProduct] = useState(undefined);

  //   useEffect(() => {
  //     setProduct(_products);
  //     // setProduct(productData.getProductBySlug(productSlug))
  //   }, [productSlug]);

  const dispatch = useDispatch();
  const [product, setProduct] = useState(undefined);

  const productData = useSelector((state) => state.products?.products);
  const productSlug = useSelector((state) => state.productModal.value);

  const getProductBySlug = (slug) => productData.find((e) => e.code === slug);

  useEffect(() => {
    setProduct(getProductBySlug(productSlug));
  }, [productSlug]);

  return (
    <div
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
