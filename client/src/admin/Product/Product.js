import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/";

import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Product = () => {
  const dispatch = useDispatch();
  const [productO, setProductO] = useState([]);

  const products = useSelector((state) => state.products.products);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchData = async () => {
    const res = await axios.get("https://yoloshopapi.herokuapp.com/Product");
    setProductO(res.data);
  };
  const handleDelete = (id) => {
    console.log(typeof id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetchData();
        try {
          let _id = JSON.stringify(id);
          await axios({
            method: "DELETE",
            url: "https://yoloshopapi.herokuapp.com/Product",
            data: _id,
            headers: { "Content-Type": "application/json" },
          }).then((res) => {
            fetchData();
          });
        } catch (err) {
          console.log(err);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleAdd = () => {
    setShowAddProduct(!showAddProduct);
  };

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = products.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
  }, [filterText, resetPaginationToggle]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(productO);

  const tableRef = useRef();
  useEffect(() => {
    document.querySelector("body").classList.add("add-modal");

    return () => {
      document.querySelector("body").classList.remove("add-modal");
    };
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      let _id = JSON.stringify(id);
      await axios({
        method: "POST",
        url: "https://yoloshopapi.herokuapp.com/ProductStatus",
        data: _id,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        toast.success("Change successfully");
        fetchData();
      });
    } catch (err) {
      toast.success("Failed " + err);
    }
  };

  return (
    <AdminLayout>
      <button onClick={handleAdd}>Add Product</button>
      <div
        style={{
          height: "90vh",
          overflow: "hidden",
          scrollBehavior: "auto",
          overflow: "scroll",
        }}
        ref={tableRef}
      >
        <table>
          <thead>
            <tr>
              <th className="th-heading">Name</th>
              <th className="th-heading">Image</th>
              <th className="th-heading">Price</th>
              <th className="th-heading">Description</th>
              <th className="th-heading">Quantity</th>
              <th className="th-heading">Discount</th>
              <th className="th-heading">Category</th>
              <th className="th-heading">Size</th>
              <th className="th-heading">Status</th>
              <th className="th-heading" style={{ width: "7%" }}>
                Action
              </th>
            </tr>
          </thead>
          {productO.length > 0 &&
            productO?.map((item) => (
              <tbody>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td style={{ width: "100px", height: "100px" }}>
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.shortDes}</td>
                  <td>{item.quantity}</td>
                  <td>{item.discount}</td>
                  <td>{item.categoryName}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0 5px" }}>
                      {item.sizes.map((item) => (
                        <div
                          style={{
                            display: "inline-flex",
                            width: "30px",
                            height: "30px",
                            border: "1px solid",
                            borderRadius: "100rem",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div
                      onClick={() => handleChangeStatus(item.id)}
                      style={{ fontSize: "30px", textAlign: "center" }}
                    >
                      {item.status ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                  </td>
                  <td style={{ width: "100px" }}>
                    <div
                      style={{ fontSize: "24px", display: "flex", gap: "10px" }}
                    >
                      <div onClick={() => handleDelete(item.id)}>
                        <MdDeleteForever />
                      </div>
                      <div>
                        <EditProduct
                          dispatch={dispatch}
                          fetchData={fetchData}
                          product={item}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>

      {showAddProduct && (
        <AddProduct
          fetchData={fetchData}
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
        />
      )}
    </AdminLayout>
  );
};

export default Product;
