import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import styled from "styled-components";

const PaypalCheckoutButton = (props) => {
  const { onClick, product } = props;
  const ButtonPaypal = styled.div`
    background-color: #ffc439;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 16px;
    font-style: italic;
    font-weight: bold;
    cursor: pointer;
    margin-top: 6px;
  `;
  const ButtonPaypalNameFirst = styled.span`
    color: #073990;
  `;
  const ButtonPaypalNameSecond = styled.span`
    color: #51a8ad;
  `;

  return (
    <>
      <ButtonPaypal onClick={onClick}>
        <ButtonPaypalNameFirst>Thanh</ButtonPaypalNameFirst>
        <ButtonPaypalNameSecond>Toan</ButtonPaypalNameSecond>
      </ButtonPaypal>
    </>
  );
};

export default PaypalCheckoutButton;
