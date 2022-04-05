import React, { Component } from "react";
import cart from "../../icons/navbar-cart.svg";
import styles from "./Minicart.module.css";
import { cartContext } from "../../context/cartContext";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";

export default class Minicart extends Component {
  static contextType = cartContext;
  wrapperRef = React.createRef();
  state = {
    show: false,
  };

  toggleShow = () => {
    this.setState((prevState) => ({ show: !prevState.show }));
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ show: false });
    }
  };
  render() {
    const cartData = this.context;
    const { productsInCart } = cartData;
    return (
      <div className={styles.minicart} ref={this.wrapperRef}>
        <button onClick={this.toggleShow}>
          <img className={styles.cart} src={cart} alt="cart" />
        </button>

        <aside className={`${this.state.show ? styles.show : ""}`}>
          {productsInCart.length ? (
            <>
              <p>
                <span className={styles.myBag}>My Bag, </span>
                <span
                  className={styles.items}
                >{`${productsInCart.length} items`}</span>
              </p>
              {productsInCart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
              <p className={styles.total}>
                Total <span>$100</span>
              </p>
              <div className={styles.links}>
                <button className={styles.viewBag}>
                  <Link to="/cart">View Bag</Link>
                </button>

                <button className={styles.checkout}>Check out</button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </aside>
      </div>
    );
  }
}
