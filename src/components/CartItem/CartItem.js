import React, { Component } from "react";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import GallerySlider from "../GallerySlider/GallerySlider";
import styles from "./CartItem.module.css";

export default class CartItem extends Component {
  changeAttributeValues = this.props.changeAttributeValues;
  product = this.props.item.product;
  changeAttrSelection = (atrributeId, attribute) => {
    this.changeAttributeValues(this.product.id, atrributeId, attribute);
  };

  render() {
    const product = this.product;
    const { selectedCurrencySymbol, item } = this.props;
    const { selectedAttributes } = item;
    return (
      <div className={styles.cartItem}>
        <div className={styles.productDetails}>
          <ProductTitle product={product} />
          <ProductPrice
            product={product}
            selectedCurrencySymbol={selectedCurrencySymbol}
            quantity={this.props.item.quantity}
          />
          <ProductAttributes
            attributes={product.attributes}
            attributeSelections={selectedAttributes}
            changeAttrSelection={this.changeAttrSelection}
          />
        </div>
        <div className={styles.quantity}>
          <QuantityButtons
            item={item}
            changeQuantity={this.props.changeQuantity}
          />
        </div>
        <div className={styles.gallery}>
          <GallerySlider product={product} />
        </div>
      </div>
    );
  }
}
