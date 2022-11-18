import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../../redux/apiRequest";
const Modal = ({ handleClose, setShowModal, showModal, idDeleteOrder }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.payment.deleteOrderFetching);
  console.log("loading: ", loading);
  const handleDeleteOrder = (idDeleteOrder) => {
    deleteOrder(idDeleteOrder, dispatch);
  };
  return (
    <>
      {loading ? alert("success delete") : "isLoading"}
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thong bao"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ban co chac chan muon xoa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Huy
          </Button>
          <Button onClick={() => handleDeleteOrder(idDeleteOrder)}>Xoa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
