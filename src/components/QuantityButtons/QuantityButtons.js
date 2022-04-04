import React, { Component } from "react";
import styles from "./QuantityButtons.module.css";

export default class QuantityButtons extends Component {
  render() {
    const { changeQuantity, item } = this.props;
    const { product, quantity } = item;
    return (
      <>
        <button onClick={() => changeQuantity(product, 1)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => changeQuantity(product, -1)}>-</button>
      </>
    );
  }
}
