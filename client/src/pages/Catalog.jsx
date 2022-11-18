import React, { useCallback, useEffect, useRef, useState } from "react";

import CheckBox from "../components/CheckBox";
import Helmet from "../components/Helmet";

import { useDispatch, useSelector } from "react-redux";
import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import { getAllCate, getAllProduct } from "../redux/apiRequest";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Catalog = () => {
  //   const dispatch = useDispatch();
  //   const _products = useSelector((state) => state.products?.products);

  //   useEffect(() => {
  //     getAllProduct(dispatch);
  //   }, [dispatch]);

  //   const initFilter = {
  //     category: [],
  //     color: [],
  //     size: [],
  //   };

  //   const productList = _products;

  //   const [products, setProducts] = useState(productList);

  //   const [filter, setFilter] = useState(initFilter);

  //   const filterSelect = (type, checked, item) => {
  //     if (checked) {
  //       switch (type) {
  //         case "CATEGORY":
  //           setFilter({
  //             ...filter,
  //             category: [...filter.category, item.categorySlug],
  //           });
  //           break;
  //         case "COLOR":
  //           setFilter({ ...filter, color: [...filter.color, item.color] });
  //           break;
  //         case "SIZE":
  //           setFilter({ ...filter, size: [...filter.size, item.size] });
  //           break;
  //         default:
  //       }
  //     } else {
  //       switch (type) {
  //         case "CATEGORY":
  //           const newCategory = filter.category.filter(
  //             (e) => e !== item.categorySlug
  //           );
  //           setFilter({ ...filter, category: newCategory });
  //           break;
  //         case "COLOR":
  //           const newColor = filter.color.filter((e) => e !== item.color);
  //           setFilter({ ...filter, color: newColor });
  //           break;
  //         case "SIZE":
  //           const newSize = filter.size.filter((e) => e !== item.size);
  //           setFilter({ ...filter, size: newSize });
  //           break;
  //         default:
  //       }
  //     }
  //   };

  //   const clearFilter = () => setFilter(initFilter);

  //   const updateProducts = useCallback(() => {
  //     let temp = productList;

  //     if (filter.category.length > 0) {
  //       temp = temp.filter((e) => filter.category.includes(e.categorySlug));
  //     }

  //     if (filter.color.length > 0) {
  //       temp = temp.filter((e) => {
  //         const check = e.colors.find((color) => filter.color.includes(color));
  //         return check !== undefined;
  //       });
  //     }

  //     if (filter.size.length > 0) {
  //       temp = temp.filter((e) => {
  //         const check = e.sizes.find((size) => filter.size.includes(size));
  //         return check !== undefined;
  //       });
  //     }

  //     setProducts(temp);
  //   }, [filter, productList]);

  //   useEffect(() => {
  //     updateProducts();
  //   }, [updateProducts]);

  //   const filterRef = useRef(null);

  //   const showHideFilter = () => filterRef.current.classList.toggle("active");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const pending = useSelector((state) => state.products.pending);
  const categories = useSelector((state) => state.cate.getCategory.category);

  useEffect(() => {
    getAllProduct(dispatch);
    getAllCate(dispatch);
  }, [dispatch]);

  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const [prdList, setPrdList] = useState(products);
  const [filter, setFilter] = useState(initFilter);

  const updateProducts = useCallback(() => {
    let temp = products;

    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }
    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.sizes.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }
    setPrdList(temp);
  }, [filter, products]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };
  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");
  const clearFilter = () => {
    setFilter(initFilter);
  };

  return (
    <Helmet title="Sản phẩm">
      {pending ? (
        <Loading />
      ) : (
        <>
          <div className="catalog">
            <div className="catalog__filter" ref={filterRef}>
              <div
                className="catalog__filter__close"
                onClick={() => showHideFilter()}
              >
                <i className="bx bx-left-arrow-alt"></i>
              </div>
              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__title">
                  danh mục sản phẩm
                </div>
                <div className="catalog__filter__widget__content">
                  {categories?.map((item, index) => (
                    <div
                      key={index}
                      className="catalog__filter__widget__content__item"
                    >
                      <Link to={`category/${item.code}`}>{item.name}</Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__title">kích cỡ</div>
                <div className="catalog__filter__widget__content">
                  {size.map((item, index) => (
                    <div
                      key={index}
                      className="catalog__filter__widget__content__item"
                    >
                      <CheckBox
                        label={item.display}
                        onChange={(input) =>
                          filterSelect("SIZE", input.checked, item)
                        }
                        checked={filter.size.includes(item.size)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__content">
                  <Button size="sm" onClick={clearFilter}>
                    xóa bộ lọc
                  </Button>
                </div>
              </div>
            </div>
            <div className="catalog__filter__toggle">
              <Button size="sm" onClick={() => showHideFilter()}>
                bộ lọc
              </Button>
            </div>
            <div className="catalog__content">
              <InfinityList data={prdList.length > 0 ? prdList : products} />
            </div>
          </div>
        </>
      )}
    </Helmet>
  );
};

export default Catalog;
