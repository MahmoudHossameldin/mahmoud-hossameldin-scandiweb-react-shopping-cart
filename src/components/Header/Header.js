import React, { Component } from "react";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import CurrencyMenu from "../CurrencyMenu/CurrencyMenu";
import Minicart from "../Minicart/Minicart";
import styles from "./Header.module.css";
import logo from "../../icons/logo.svg";

class Header extends Component {
  render() {
    return (
      <nav className={styles.navbar}>
        <>
          <CategoryMenu />
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.actions}>
            <CurrencyMenu />
            <Minicart />
          </div>
        </>
      </nav>
    );
  }
}

export default Header;
