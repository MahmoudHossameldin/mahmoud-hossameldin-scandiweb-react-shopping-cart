import React, { Component } from "react";
import styles from "./SingleProduct.module.css";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import AddToCartForm from "../../components/AddToCartForm/AddToCartForm";
import ProductDescription from "../../components/ProductDescription.js/ProductDescription";
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import { dataContext } from "../../context/dataContext";
import { withRouter } from "react-router-dom";
import Error404 from "../../components/Error404/Error404";

class SingleProduct extends Component {
  static contextType = dataContext;
  storeData = this.context;
  categories = this.storeData.categories;

  currentCategoryName = this.props.match.params.categoryName;
  currentProductId = this.props.match.params.productId;

  categoryObjFromAPI = this.categories.find(
    (category) => category.name === this.currentCategoryName
  );
  product = this.categoryObjFromAPI?.products.find(
    (product) => product.id === this.currentProductId
  );

  render() {
    return this.product ? (
      <main className={styles.singleProduct}>
        <ProductGallery product={this.product} />
        <div>
          <ProductTitle product={this.product} />
          <AddToCartForm product={this.product} />
          <ProductDescription description={this.product.description} />
        </div>
      </main>
    ) : (
      <Error404 />
    );
  }
}

export default withRouter(SingleProduct);
