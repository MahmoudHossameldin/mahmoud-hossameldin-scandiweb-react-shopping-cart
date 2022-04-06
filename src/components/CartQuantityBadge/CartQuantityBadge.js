import React, { Component } from "react";
import { cartContext } from "../../context/cartContext";

export default class CartQuantityBadge extends Component {
  static contextType = cartContext;
  render() {
    const cartData = this.context;
    const { productsInCart } = cartData;
    return (
      <span>
        {productsInCart.reduce((acc, curr) => {
          return curr.quantity + acc;
        }, 0)}
      </span>
    );
  }
}
