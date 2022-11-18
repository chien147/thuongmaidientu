import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfinityList from "../components/InfinityList";
import Loading from "../components/Loading";

import { getProductByCate } from "../redux/apiRequest";

const Category = () => {
  const dispatch = useDispatch();
  const slug = useParams();

  const products = useSelector((state) => state.products.productByCate);
  const pending = useSelector((state) => state.products.pending);
  console.log(products);
  console.log("pending  category page", pending);

  useEffect(() => {
    getProductByCate(slug.cate, dispatch);
  }, [dispatch, slug.cate]);
  return (
    <div>
      <div className="catalog__content">
        {pending ? <Loading /> : <InfinityList data={products} />}
      </div>
    </div>
  );
};

export default Category;
