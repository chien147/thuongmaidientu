import React, { useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiOutlineClose } from "react-icons/ai";

import "./style.scss";

const OrderDetail = ({
  showDetailOrder,
  setShowDetailOrder,
  orderDetail,
  orderDetailLoading,
}) => {
  const OrderDetailContainer = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    height: 100%;
    left: 0;
    right: 0;
    z-index: 100;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const OrderDetailWrap = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    min-width: 50%;
    height: 70%;
    background-color: #fff;
    ${"" /* text-align: center; */}
    border-radius: 5px;
  `;

  const OrderDetailContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 10px 10px;
  `;

  const Customer = styled.div`
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  `;
  const CustomerGroupInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
  `;
  const OrderDetailContentLeft = styled.div``;
  const OrderDetailRightIN = styled.div``;
  const OrderDetailContentRight = styled.div``;
  const OrderDetailContentInfo = styled.div``;
  const Close = styled.div`
    margin-top: 10px;
    border: 1px solid #eee;
    padding: 5px 7px;
    background-color: #888777;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    color: #fbf040;
  `;

  const productorder = orderDetail.productorder;

  return (
    <OrderDetailContainer>
      <OrderDetailWrap>
        <OrderDetailContent>
          <OrderDetailContentLeft>
            {orderDetailLoading ? (
              "loading"
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Size</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productorder.map((row) => (
                        <TableRow
                          height="50px"
                          key={row.name}
                          sx={{
                            maxHeight: 50,
                          }}
                          className="productorderrow"
                        >
                          <TableCell align="right" width="10px">
                            <img src={row.image}></img>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">{row.size}</TableCell>
                          <TableCell align="right">{row.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            <OrderDetailContentInfo>
              <h3 style={{ marginTop: "10px", padding: "0 10px" }}>
                Customer info
              </h3>
              {orderDetailLoading ? (
                "loading"
              ) : (
                <Customer>
                  <CustomerGroupInfo>
                    <div>Customer name</div>{" "}
                    <div>{orderDetail.customerName}</div>
                  </CustomerGroupInfo>
                  <CustomerGroupInfo>
                    <div>Customer phone</div>{" "}
                    <div>{orderDetail.customerPhone}</div>
                  </CustomerGroupInfo>
                  <CustomerGroupInfo>
                    <div>Type</div> <div>{orderDetail.payment}</div>
                  </CustomerGroupInfo>
                  <CustomerGroupInfo>
                    <div>Address</div> <div>{orderDetail.customerAddress}</div>
                  </CustomerGroupInfo>
                  <CustomerGroupInfo>
                    <div>Message</div> <div>{orderDetail.message}</div>
                  </CustomerGroupInfo>
                </Customer>
              )}
            </OrderDetailContentInfo>
          </OrderDetailContentLeft>
          <OrderDetailContentRight>
            {!orderDetailLoading && (
              <Customer>
                <h3 style={{ marginTop: "10px", padding: "0 10px" }}>
                  Order summary
                </h3>

                <CustomerGroupInfo>
                  <div>updatedDate</div>
                  <div>{orderDetail.updatedDate}</div>
                </CustomerGroupInfo>
                <CustomerGroupInfo>
                  reatedDate
                  <div>{orderDetail.createdDate}</div>
                </CustomerGroupInfo>
                <CustomerGroupInfo>
                  <div>total</div>
                  <div>{orderDetail.total}</div>
                </CustomerGroupInfo>
              </Customer>
            )}
          </OrderDetailContentRight>
          <OrderDetailRightIN>
            <Close onClick={() => setShowDetailOrder(false)}>
              <AiOutlineClose />
            </Close>
          </OrderDetailRightIN>
        </OrderDetailContent>
      </OrderDetailWrap>
    </OrderDetailContainer>
  );
};

export default OrderDetail;
