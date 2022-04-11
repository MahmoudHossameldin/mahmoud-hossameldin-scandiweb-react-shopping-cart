import React, { Component } from "react";
import { cartContext } from "../../context/cartContext";

export default class QuantityButtons extends Component {
  static contextType = cartContext;

  render() {
    const cartData = this.context;
    const { changeQuantity } = cartData;
    const { item } = this.props;
    const { quantity } = item;
    return (
      <>
        <button onClick={() => changeQuantity(item, 1)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => changeQuantity(item, -1)}>-</button>
      </>
    );
  }
}
