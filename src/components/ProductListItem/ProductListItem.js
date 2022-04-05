import React, { Component } from "react";
import { dataContext } from "../../context/dataContext";
import { Link } from "react-router-dom";
import styles from "./ProductListItem.module.css";
import CartIcon from "../CartIcon/CartIcon";

export default class ProductListItem extends Component {
  static contextType = dataContext;

  render() {
    const storeData = this.context;
    const { selectedCategoryName, categories, selectedCurrencySymbol } =
      storeData;
    const selectCategoryFromAPI = categories.find(
      (category) => category.name === selectedCategoryName
    );
    const { products } = selectCategoryFromAPI;

    return products.map((product) => {
      const price = product.prices.find(
        (price) => price.currency.symbol === selectedCurrencySymbol
      );
      return (
        <div
          className={`${styles.productListItem} ${
            !product.inStock ? styles.outOfStock : ""
          }`}
          key={product.id}
        >
          <div className={styles.imgContainer}>
            {!product.inStock && <span>Out of stock</span>}
            <Link
              to={`/${selectedCategoryName}/${product.id}`}
              key={product.id}
            >
              <img
                src={product.gallery[0]}
                alt={product.name}
                className={styles.featuredImage}
              />
            </Link>
          </div>
          <div className={styles.nameAndPrice}>
            {product.attributes.length === 0 && <CartIcon product={product} />}
            <p className={styles.name}>
              {product.brand} {product.name}
            </p>
            <p>
              {price.currency.symbol}
              {Number(Math.round(price.amount + "e" + 2) + "e-" + 2).toFixed(2)}
            </p>
          </div>
        </div>
      );
    });
  }
}
