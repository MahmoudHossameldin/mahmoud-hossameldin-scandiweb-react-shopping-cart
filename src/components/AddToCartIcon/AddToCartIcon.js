import React, { Component } from "react";
import cartIcon from "../../icons/add-to-cart.svg";
import styles from "./AddToCartIcon.module.css";
import { cartContext } from "../../context/cartContext";

export default class AddToCartIcon extends Component {
  static contextType = cartContext;
  product = this.props.product;

  render() {
    const cartData = this.context;
    const { addToCart } = cartData;
    const product = this.product;

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
