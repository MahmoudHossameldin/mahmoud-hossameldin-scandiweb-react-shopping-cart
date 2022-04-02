import React, { Component } from "react";
import styles from "./ProductTitle.module.css";

export default class ProductTitle extends Component {
  render() {
    return (
      <>
        <p className={styles.brand}>{this.props.product.brand}</p>
        <p className={styles.productName}>{this.props.product.name}</p>
      </>
    );
  }
}
