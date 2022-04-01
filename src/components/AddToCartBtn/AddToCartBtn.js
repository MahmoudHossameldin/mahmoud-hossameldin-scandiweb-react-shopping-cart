import React, { Component } from "react";
import styles from "./AddToCartBtn.module.css";

export default class AddToCartBtn extends Component {
  product = this.props.product;
  render() {
    return <button className={styles.addToCartBtn}>Add to cart</button>;
  }
}
