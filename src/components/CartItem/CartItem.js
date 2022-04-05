import React, { Component } from "react";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import QuantityButtons from "../QuantityButtons/QuantityButtons";
import GallerySlider from "../GallerySlider/GallerySlider";
import styles from "./CartItem.module.css";
import { cartContext } from "../../context/cartContext";

export default class CartItem extends Component {
  static contextType = cartContext;
  cartData = this.context;
  changeAttributeValues = this.cartData.changeAttributeValues;

  product = this.props.item.product;
  changeAttrSelection = (atrributeId, attribute) => {
    this.changeAttributeValues(this.product.id, atrributeId, attribute);
  };

  render() {
    const product = this.product;
    const { item } = this.props;
    const { selectedAttributes } = item;
    return (
      <div className={styles.cartItem}>
        <div className={styles.productDetails}>
          <ProductTitle product={product} />
          <ProductPrice product={product} quantity={this.props.item.quantity} />
          <ProductAttributes
            attributes={product.attributes}
            attributeSelections={selectedAttributes}
            changeAttrSelection={this.changeAttrSelection}
          />
        </div>
        <div className={styles.quantity}>
          <QuantityButtons item={item} />
        </div>
        <div className={styles.gallery}>
          <GallerySlider product={product} />
        </div>
      </div>
    );
  }
}
