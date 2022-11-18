import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const FormEdit = ({ product, setShow, fetchData }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getCateData = useSelector((state) => state.cate.getCategory.category);

  const cloneImage = product.image;

  const [id, setID] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [shortDes, setShortDes] = useState(product.shortDes);
  const [image, setImage] = useState(product.image);
  const [categoryName, setCategoryName] = useState(product.categoryName);
  const [quantity, setQuantity] = useState(product.quantity);
  const [discount, setDiscount] = useState(product.discount);
  const [size, setSize] = useState([]);

  var Sizes = ["s", "m", "l", "xl"];

  const handleResetField = () => {
    setID("");
    setName("");
    setPrice("");
    setShortDes("");
    setImage(null);
    setCategoryName("");
    setSize("");
  };

  const handleClose = (e) => {
    e.preventDefault();
    // document.querySelector("body").classList.remove("add-modal");
    setShow(false);
    handleResetField();
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        id: product.id,
        name: name,
        price: price,
        shortDes: shortDes,
        file: image,
        quantity: quantity,
        discount: discount,
        categoryName: categoryName,
        size: size,
      };

      console.log(newProduct);
      const formData = new FormData();

      formData.append("id", newProduct.id);
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("shortDes", newProduct.shortDes);
      formData.append("shortDetails", "xin chao");
      formData.append("file", newProduct.file);
      formData.append("quantity", newProduct.quantity);
      formData.append("discount", newProduct.discount);
      formData.append("view", 1);
      formData.append("categoryName", newProduct.categoryName);
      formData.append("size", ["s", "m", "l"]);

      const res = await axios.put(
        "https://yoloshopapi.herokuapp.com/Product",
        formData
      );

      fetchData();
      toast.success("Update success");

      // updateProduct(dispatch, newProduct);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileImage = (e) => {
    let file = e.target.files[0];
    setImage(file);
  };

  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const res = await axios.get("https://yoloshopapi.herokuapp.com/Category");
    setCategories(res.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="overlay"></div>
      <div className="form__update-container">
        <div className="form__update-image">
          <img src={cloneImage} className="" />
        </div>
        <form
          className="form__update-form"
          method="put"
          encType="multipart/form-data"
        >
          <div className="form-left">
            <div className="form-group-edit">
              <label>Name</label>
              <input
                value={name}
                type="text"
                className="product-input-ad"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group-edit">
              <label>Price</label>
              <input
                value={price}
                type="text"
                className="product-input-ad"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group-edit">
              <label>Quantity</label>
              <input
                value={quantity}
                type="text"
                className="product-input-ad"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-group-edit">
              <label>Category</label>

              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                >
                  {categories.length > 0 &&
                    categories?.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="form-right">
            <div className="form-group-edit">
              <label>Discount</label>
              <input
                value={discount}
                type="text"
                className="product-input-ad"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="form-group-edit">
              <label>Description</label>
              <input
                type="text"
                className="product-input-ad"
                value={shortDes}
                onChange={(e) => setShortDes(e.target.value)}
              />
            </div>
            <div className="form-group-edit">
              <label>Size</label>
              <div className="product-sizes act_size">
                {Sizes.map((item, index) => (
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
            <div className="form-group-edit">
              <label>Image</label>
              <input
                type="file"
                // value={image}
                className="product-input-ad"
                onChange={handleFileImage}
              />
            </div>
            <div className="form-button-edit">
              <button
                type="submit"
                className="btn-add-product"
                onClick={handleEditProduct}
              >
                Edit product
              </button>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormEdit;
