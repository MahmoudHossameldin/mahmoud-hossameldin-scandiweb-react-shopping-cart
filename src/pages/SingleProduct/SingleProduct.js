import React, { Component } from "react";
import styles from "./SingleProduct.module.css";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import AddToCartForm from "../../components/AddToCartForm/AddToCartForm";
import ProductDescription from "../../components/ProductDescription.js/ProductDescription";
import ProductTitle from "../../components/ProductTitle/ProductTitle";

export default class SingleProduct extends Component {
  categoryObjFromAPI = this.props.categories.find(
    (category) => category.name === this.props.currentCategoryName
  );
  product = this.categoryObjFromAPI.products.find(
    (product) => product.id === this.props.currentProductId
  );

  render() {
    return (
      <div className={styles.singleProduct}>
        <ProductGallery product={this.product} />
        <div>
          <ProductTitle product={this.product} />
          <AddToCartForm
            product={this.product}
            addToCart={this.props.addToCart}
            selectedCurrencySymbol={this.props.selectedCurrencySymbol}
          />
          <ProductDescription description={this.product.description} />
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
