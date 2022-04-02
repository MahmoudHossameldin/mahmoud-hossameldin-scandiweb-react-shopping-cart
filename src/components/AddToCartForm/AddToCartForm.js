import React, { Component } from "react";
import ProductAttribute from "../ProductAttribute/ProductAttribute";
import styles from "./AddToCartForm.module.css";

export default class ProductAttributes extends Component {
  state = {
    AttributesAndValues: [],
  };

  attributesAndSelections = (attributeName, selectionValue) => {
    // if attribute exists
    if (this.state.AttributesAndValues.some((attr) => attr[attributeName])) {
      // update attribute
      const index = this.state.AttributesAndValues.findIndex((attrObj) => {
        return attrObj[attributeName];
      });
      this.setState((prevAttributes) => {
        return {
          AttributesAndValues: [
            ...prevAttributes.AttributesAndValues.slice(0, index),
            { [attributeName]: selectionValue },
            ...prevAttributes.AttributesAndValues.slice(index + 1),
          ],
        };
      });
    } else {
      // add attribute
      this.setState((prevAttributes) => ({
        AttributesAndValues: [
          ...prevAttributes.AttributesAndValues,
          { [attributeName]: selectionValue },
        ],
      }));
    }
  };

  render() {
    console.log(this.state.AttributesAndValues);
    const product = this.props.product;
    const attributes = this.props.attributes;
    const price = this.props.price;
    return (
      <>
        {attributes
          ? attributes.map((attribute) => (
              <ProductAttribute
                key={attribute.id}
                attribute={attribute}
                attributesAndSelections={this.attributesAndSelections}
              />
            ))
          : ""}
        <span>Price:</span>
        <span className={styles.price}>
          {price.currency.symbol}
          {price.amount}
        </span>
        {product.inStock ? (
          <button
            className={styles.addToCartBtn}
            onClick={() =>
              this.props.addToCart(product, this.state.AttributesAndValues)
            }
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
