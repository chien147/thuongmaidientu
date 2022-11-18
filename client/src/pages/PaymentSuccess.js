import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PaymentSuccess = () => {
  const PaymentSuccessContainer = styled.div`
    text-align: center;
    padding: 40px 0;
    background: #ebf0f5;

    h1 {
      color: #88b04b;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
      font-weight: 900;
      font-size: 40px;
      margin-bottom: 10px;
    }
    p {
      color: #404f5e;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
      font-size: 20px;
      margin: 0;
    }
    i {
      color: #9abc66;
      font-size: 100px;
      line-height: 200px;
      margin-left: -15px;
    }
    .card {
      background: white;
      padding: 60px;
      border-radius: 4px;
      box-shadow: 0 2px 3px #c8d0d8;
      display: inline-block;
      margin: 0 auto;
    }
    .button-group {
      padding: 7px 10px;
      border-radius: 4px;
      background-color: #1ceadd;
      color: white;
    }
  `;

  return (
    <PaymentSuccessContainer>
      <div className="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: " #F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>
          Chúng tôi đã nhận được yêu cầu mua hàng của bạn;
          <br /> chúng tôi sẽ sớm liên lạc với bạn!
        </p>
        <div style={{ marginTop: "20px" }}>
          <Link className="button-group" to="/history-order">
            Lịch sử đặt hàng{" "}
          </Link>
        </div>
      </div>
    </PaymentSuccessContainer>
  );
};

export default PaymentSuccess;
