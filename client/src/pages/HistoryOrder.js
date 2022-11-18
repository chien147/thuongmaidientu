import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../redux/apiRequest";

const HistoryOrder = () => {
  const orders = useSelector((state) => state.payment.dataOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrder(dispatch);
  }, []);
  console.log("dataOrder ", orders);
  const user = useSelector((state) => state.auth?.currentUser);
  console.log(user.id);
  console.log(user);
  let orderArr = [];
  orders.map((order) =>
    order.customerId === user.id ? orderArr.push(order) : ""
  );

  orderArr.map((item) =>
    console.log(item.productorder.map((item) => item.name))
  );
  console.log("orderArr ", orderArr);

  return (
    <p>
      <h3 style={{ textAlign: "center" }}>Lịch sử đặt hàng</h3>
      <div className="history-order">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Ngay thang</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>size</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderArr.map((iton) =>
              iton.productorder.map((item) => (
                <tr key={item.idx}>
                  <td>{iton.createdDate}</td>

                  <td>
                    <img
                      style={{ width: "80px", height: "80px" }}
                      src={item.image}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.size}</td>
                  <td>{item.total}</td>
                  <td>{iton.status ? "Da xu  ly" : "Chua xu ly"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </p>
  );
};

export default HistoryOrder;
