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
  abortController = new AbortController();
  storeData = this.context;
  categories = this.storeData.categories;

  currentProductId = this.props.match.params.productId;

  state = {
    product: null,
    loading: true,
  };

  componentDidMount() {
    this.context.fetchProduct({
      id: this.currentProductId,
      signal: this.abortController.signal,
      error: (error) => console.log("ERROR: " + error),
      success: (product) => this.setState({ product, loading: false }),
    });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const product = this.state.product;
    if (this.state.loading) {
      return <div className="loader"></div>;
    }
    if (!this.state.loading && !product) {
      return <Error404 />;
    }
    return (
      <main className={styles.singleProduct}>
        <ProductGallery product={product} />
        <div>
          <ProductTitle product={product} />
          <AddToCartForm product={product} />
          <ProductDescription description={product.description} />
        </div>
      </main>
    );
  }
}

export default withRouter(SingleProduct);
