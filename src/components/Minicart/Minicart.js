import React, { Component } from "react";
import cart from "../../icons/navbar-cart.svg";
import styles from "./Minicart.module.css";

export default class Minicart extends Component {
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
    return (
      <div className={styles.minicart} ref={this.wrapperRef}>
        <button>
          <img
            className={styles.cart}
            src={cart}
            alt="cart"
            onClick={this.toggleShow}
          />
        </button>

        <aside className={`${this.state.show ? styles.show : ""}`}>
          <p>Your cart is empty.</p>
        </aside>
      </div>
    );
  }
}
