import React, { Component } from "react";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";
import { cartContext } from "../../context/cartContext";

export default class Cart extends Component {
  static contextType = cartContext;

  render() {
    const cartData = this.context;
    const { productsInCart } = cartData;

    return (
      <main className={styles.cart}>
        <p className={styles.pageTitle}>Cart</p>
        {productsInCart.map((item) => (
          <div key={item.product.id + JSON.stringify(item.selectedAttributes)}>
            <hr />
            <CartItem item={item} />
          </div>
        ))}
      </main>
    );
  }
}
