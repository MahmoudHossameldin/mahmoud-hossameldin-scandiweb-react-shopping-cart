import React, { Component } from "react";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import ProductPrice from "../ProductPrice/ProductPrice";
import styles from "./AddToCartForm.module.css";

export default class AddToCartForm extends Component {
  attributes =
    this.props.product.attributes.length && this.props.product.attributes;

  extractAttributeNames = this.attributes
    ? this.attributes.map((attr) => attr.id)
    : [];
  AttributesWithNullValues = this.extractAttributeNames.reduce(
    (acc, curr) => ((acc[curr] = null), acc),
    {}
  );

  state = {
    attributeSelections: { ...this.AttributesWithNullValues },
  };

  changeAttrSelection = (attributeId, valueObj) => {
    this.setState((prevState) => ({
      attributeSelections: {
        ...prevState.attributeSelections,
        [attributeId]: valueObj.id,
      },
    }));
  };

  attributesNotSelected() {
    for (let key in this.state.attributeSelections) {
      if (this.state.attributeSelections[key] === null) {
        return true;
      }
    }
    return false;
  }

  render() {
    const product = this.props.product;

    return (
      <div className={styles.cartForm}>
        <ProductAttributes
          attributes={this.attributes}
          attributeSelections={this.state.attributeSelections}
          changeAttrSelection={this.changeAttrSelection}
        />
        <span>Price:</span>
        <ProductPrice
          product={product}
          selectedCurrencySymbol={this.props.selectedCurrencySymbol}
        />
        {product.inStock ? (
          <button
            className={styles.addToCartBtn}
            onClick={() =>
              this.props.addToCart(product, this.state.attributeSelections)
            }
            disabled={this.attributesNotSelected()}
          >
            Add to cart
          </button>
        ) : (
          <p className={styles.outOfStock}>Out of stock</p>
        )}
      </div>
    );
  }
}
