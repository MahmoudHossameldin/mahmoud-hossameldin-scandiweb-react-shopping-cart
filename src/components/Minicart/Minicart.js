import React, { Component } from "react";
import cart from "../../icons/navbar-cart.svg";
import styles from "./Minicart.module.css";
import { cartContext } from "../../context/cartContext";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import TotalCartCost from "../TotalCartCost/TotalCartCost";
import CartQuantityBadge from "../CartQuantityBadge/CartQuantityBadge";

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
      <>
        <div
          className={`${styles.overlay} ${this.state.show ? styles.show : ""}`}
        ></div>
        <div className={`${styles.minicart} minicart`} ref={this.wrapperRef}>
          <button onClick={this.toggleShow}>
            <img className={styles.cart} src={cart} alt="cart" />
            {productsInCart.length ? <CartQuantityBadge /> : ""}
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
                  Total <TotalCartCost productsInCart={productsInCart} />
                </p>
                <div className={styles.links}>
                  <Link to="/cart" className={styles.viewBag}>
                    <button>View Bag</button>
                  </Link>

                  <button className={styles.checkout}>Check out</button>
                </div>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </aside>
        </div>
      </>
    );
  }
}
