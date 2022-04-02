import React, { Component } from "react";
import styles from "./ProductPrice.module.css";

export default class ProductPrice extends Component {
  render() {
    const price = this.props.product.prices.find(
      (price) => price.currency.symbol === this.props.selectedCurrencySymbol
    );
    return (
      <>
        <span>Price:</span>
        <span className={styles.price}>
          {price.currency.symbol}
          {price.amount}
        </span>
      </>
    );
  }
}
