import React, { Component } from "react";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";

export default class Cart extends Component {
  render() {
    return (
      <main className={styles.cart}>
        <p className={styles.pageTitle}>Cart</p>
        {this.props.productsInCart.map((item) => (
          <div key={item.product.id}>
            <hr />
            <CartItem
              item={item}
              changeAttributeValues={this.props.changeAttributeValues}
              changeQuantity={this.props.changeQuantity}
              selectedCurrencySymbol={this.props.selectedCurrencySymbol}
            />
          </div>
        ))}
      </main>
    );
  }
}
