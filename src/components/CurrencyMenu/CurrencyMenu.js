import React, { Component } from "react";
import arrow from "../../icons/dropdown-arrow.svg";
import styles from "./CurrencyMenu.module.css";
import { dataContext } from "../../context/dataContext";

export default class CurrencyMenu extends Component {
  static contextType = dataContext;
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
    const storeData = this.context;
    const { currencies, selectedCurrencySymbol, changeSelectedCurrency } =
      storeData;

    return (
      <div className={styles.menu} ref={this.wrapperRef}>
        <button onClick={this.toggleShow}>
          <span className={styles.currencySymbol}>
            {selectedCurrencySymbol}
          </span>
          <span className={styles.arrow}>
            <img src={arrow} alt="open currencies menu" />
          </span>
        </button>
        <ul className={`${styles.list} ${this.state.show ? styles.show : ""}`}>
          {currencies.map((currency) => (
            <li
              className={`${
                currency.symbol === selectedCurrencySymbol
                  ? styles.selected
                  : ""
              }`}
              key={currency.symbol}
              onClick={() => changeSelectedCurrency(currency.symbol)}
            >
              <span className={styles.symbol}>{currency.symbol}</span>
              <span className={styles.code}>{currency.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
