import React, { Component } from "react";
import styles from "./SingleProduct.module.css";
import DOMPurify from "dompurify";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import AddToCartForm from "../../components/AddToCartForm/AddToCartForm";

export default class SingleProduct extends Component {
  selectedCurrencySymbol = this.props.selectedCurrencySymbol;
  categoryObjFromAPI = this.props.categories.find(
    (category) => category.name === this.props.currentCategoryName
  );
  product = this.categoryObjFromAPI.products.find(
    (product) => product.id === this.props.currentProductId
  );

  render() {
    const price = this.product.prices.find(
      (price) => price.currency.symbol === this.selectedCurrencySymbol
    );
    const attributes =
      this.product.attributes.length && this.product.attributes;

    return (
      <div className={styles.singleProduct}>
        <ProductGallery product={this.product} />
        <div>
          <p className={styles.brand}>{this.product.brand}</p>
          <p className={styles.productName}>{this.product.name}</p>
          <AddToCartForm
            product={this.product}
            addToCart={this.props.addToCart}
            attributes={attributes}
            price={price}
          />
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(this.product.description),
            }}
          ></div>
        </div>
      </div>
    );
  }
}

/*
  {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
      currencies {
        label
        symbol
      }
    }
    */
