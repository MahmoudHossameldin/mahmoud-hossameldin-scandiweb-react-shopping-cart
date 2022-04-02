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
    attributesSelections: { ...this.AttributesWithNullValues },
  };

  changeAttrSelection = (attributeId, valueObj) => {
    this.setState((prevSelections) => ({
      attributesSelections: {
        ...prevSelections.attributesSelections,
        [attributeId]: valueObj.id,
      },
    }));
  };

  attributesNotSelected() {
    for (let key in this.state.attributesSelections) {
      if (this.state.attributesSelections[key] === null) {
        return true;
      }
    }
    return false;
  }

  render() {
    const product = this.props.product;

    return (
      <>
        <ProductAttributes
          attributes={this.attributes}
          attributesSelections={this.state.attributesSelections}
          changeAttrSelection={this.changeAttrSelection}
        />
        <ProductPrice
          product={product}
          selectedCurrencySymbol={this.props.selectedCurrencySymbol}
        />
        {product.inStock ? (
          <button
            className={styles.addToCartBtn}
            onClick={() =>
              this.props.addToCart(product, this.state.attributesSelections)
            }
            disabled={this.attributesNotSelected()}
          >
            Add to cart
          </button>
        ) : (
          <p className={styles.outOfStock}>Out of stock</p>
        )}
      </>
    );
  }
}
