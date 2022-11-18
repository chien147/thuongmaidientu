import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box as Box2 } from "@mui/system";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { toast } from "react-toastify";

const Overflow = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  background: black;
  z-index: 400;
  height: 100vh;
  opacity: 0.6;
`;

const ButtonClose = styled.button`
  /* position: absolute; */
  z-index: 600;
  padding: 10px 20px;
  font-size: 18px;
  margin-top: 20px;
  float: right;
`;

const Content = styled.div`
  position: absolute;
  width: 500px;
  background: white;
  z-index: 700;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: 10px;
`;

const FormUpdate = ({ setShow, id, name, status, fetchData }) => {
  const handelClose = () => {
    document.querySelector("body").classList.remove("add-modal");
    setShow(false);
  };

  const [newName, setNewName] = useState(name);
  const [newStatus, setNewStatus] = useState(status);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleChangeTextfield = (e) => {
    setNewName(e.target.value);
  };
  const handleUpdate = async () => {
    const categoryUpdated = {
      id: id,
      name: newName,
      status: newStatus ? 1 : 0,
    };
    try {
      await axios.put(
        "https://yoloshopapi.herokuapp.com/Category",
        categoryUpdated
      );
      toast.success("Update successfully");
      fetchData();
      handelClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Overflow></Overflow>

      <Content>
        <h1>Update category</h1>
        <Box2
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            value={newName}
            onChange={handleChangeTextfield}
            variant="outlined"
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newStatus}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Unactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box2>
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <ButtonClose onClick={handleUpdate}>Update</ButtonClose>
          <ButtonClose onClick={handelClose}>Close</ButtonClose>
        </div>
      </Content>
    </>
  );
};

export default FormUpdate;
