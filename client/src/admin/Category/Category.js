import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import styled from "styled-components";
import Swal from "sweetalert2";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  gap: 0 20px;
`;
const Btn = styled.button`
  font-size: 20px;
  padding: 15px 20px;
  margin-bottom: 20px;
`;

const Category = () => {
  const [categories, setCategories] = useState({});
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  async function fetchData() {
    const res = await axios.get("https://yoloshopapi.herokuapp.com/Category");
    setCategories(res.data);
  }
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("https://yoloshopapi.herokuapp.com/Category");
      setCategories(res.data);
    }
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
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
        try {
          let _id = JSON.stringify(id);
          await axios({
            method: "DELETE",
            url: "https://yoloshopapi.herokuapp.com/Category",
            data: _id,
            headers: { "Content-Type": "application/json" },
          }).then((res) => {
            fetchData();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  console.log(categories);
  return (
    <AdminLayout>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Category
      </Button>
      <table>
        <tr>
          <th className="th-heading">Id</th>
          <th className="th-heading">Name</th>
          <th className="th-heading">Status</th>
          <th className="th-heading" style={{ width: "15%" }}>
            Action
          </th>
        </tr>
        {categories.length > 0 &&
          categories?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status ? "Active" : "Unactive"}</td>
              <td>
                <ActionContainer>
                  <div onClick={() => handleDelete(item.id)}>
                    <MdDeleteForever />
                  </div>
                  <div>
                    {/* <BiEdit /> */}
                    <UpdateCategory
                      name={item.name}
                      status={item.status}
                      id={item.id}
                      fetchData={fetchData}
                    />
                  </div>
                </ActionContainer>
              </td>
            </tr>
          ))}
      </table>

      <AddCategory
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        fetchData={fetchData}
      ></AddCategory>
    </AdminLayout>
  );
};

export default Category;
