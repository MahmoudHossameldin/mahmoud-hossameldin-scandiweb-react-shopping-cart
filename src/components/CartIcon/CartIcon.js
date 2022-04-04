import React, { Component } from "react";
import cartIcon from "../../icons/add-to-cart.svg";
import styles from "./CartIcon.module.css";
import { cartContext } from "../../context/cartContext";

export default class CartIcon extends Component {
  static contextType = cartContext;

  render() {
    const cartData = this.context;
    const { addToCart } = cartData;
    const product = this.props.product;

    return (
      <button
        className={styles.addToCartBtn}
        onClick={() => addToCart(product)}
      >
        <img src={cartIcon} alt="add-to-cart" />
      </button>
    );
  }
}
