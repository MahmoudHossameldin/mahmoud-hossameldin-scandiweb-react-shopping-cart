import React, { Component } from "react";
import { dataContext } from "../../context/dataContext";
import { withRouter } from "react-router-dom";
import styles from "./SingleProduct.module.css";
import DOMPurify from "dompurify";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import ProductAttribute from "../../components/ProductAttribute/ProductAttribute";
import AddToCartBtn from "../../components/AddToCartBtn/AddToCartBtn";

class SingleProduct extends Component {
  static contextType = dataContext;

  render() {
    const storeData = this.context;
    const selectedCurrencySymbol = storeData.selectedCurrencySymbol;
    const categories = storeData.categories;
    const currentCategoryName = this.props.match.params.categoryName;
    const currentProductId = this.props.match.params.productId;
    const categoryObjFromAPI = categories.find(
      (category) => category.name === currentCategoryName
    );
    const productsOfCurrentCategory = categoryObjFromAPI.products;
    const product = productsOfCurrentCategory.find(
      (product) => product.id === currentProductId
    );
    const price = product.prices.find(
      (price) => price.currency.symbol === selectedCurrencySymbol
    );
    const attributes = product.attributes.length && product.attributes;

    return (
      <div className={styles.singleProduct}>
        <ProductGallery product={product} />
        <div>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.productName}>{product.name}</p>
          {attributes &&
            attributes.map((attribute) => (
              <ProductAttribute key={attribute.id} attribute={attribute} />
            ))}
          <span>Price:</span>
          <span className={styles.price}>
            {price.currency.symbol}
            {price.amount}
          </span>
          {product.inStock ? (
            <AddToCartBtn product={product} />
          ) : (
            <p className={styles.outOfStock}>Out of stock</p>
          )}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleProduct);

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
