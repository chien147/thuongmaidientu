import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box as Box2 } from "@mui/system";
import * as React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { toast } from "react-toastify";
export default function AlertDialog({
  open,
  setOpen,
  handleClose,

  fetchData = { fetchData },
}) {
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTextFieldChange = (e) => {
    setName(e.target.value);
  };

  const handleAdd = async () => {
    try {
      const newCate = { name: name, status: status };
      await axios.post("https://yoloshopapi.herokuapp.com/Category", newCate);
      toast.success("Success !", {
        position: toast.POSITION.TOP_CENTER,
      });

      fetchData();
      setOpen(false);
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Category"}</DialogTitle>
        <DialogContent>
          <Box2
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "70ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Name"
              onChange={handleTextFieldChange}
              variant="outlined"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Unactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} autoFocus>
            Add
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
