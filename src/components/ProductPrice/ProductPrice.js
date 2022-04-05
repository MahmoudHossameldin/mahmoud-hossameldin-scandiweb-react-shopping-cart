import React, { Component } from "react";
import styles from "./ProductPrice.module.css";
import { dataContext } from "../../context/dataContext";

export default class ProductPrice extends Component {
  static contextType = dataContext;

  render() {
    const storeData = this.context;
    const { selectedCurrencySymbol } = storeData;
    const { product } = this.props;
    const price = product.prices.find(
      (price) => price.currency.symbol === selectedCurrencySymbol
    );
    return (
      <>
        <span className={styles.price}>
          {price.currency.symbol}
          {this.props.quantity
            ? Number(
                Math.round(this.props.quantity * price.amount + "e" + 2) +
                  "e-" +
                  2
              ).toFixed(2)
            : price.amount}
        </span>
      </>
    );
  }
}
