import React, { Component } from "react";
import { dataContext } from "../../context/dataContext";

export default class TotalCartCost extends Component {
  static contextType = dataContext;

  render() {
    const { selectedCurrencySymbol } = this.context;
    return (
      <span>
        {selectedCurrencySymbol}
        {this.props.productsInCart.reduce((acc, curr) => {
          const currPriceObj = curr.product.prices.find(
            (price) => price.currency.symbol === selectedCurrencySymbol
          );
          const total = curr.quantity * currPriceObj.amount + acc;
          return +total.toFixed(2);
        }, 0)}
      </span>
    );
  }
}
