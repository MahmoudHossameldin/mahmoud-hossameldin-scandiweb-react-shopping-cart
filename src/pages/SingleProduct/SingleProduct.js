import React, { Component } from "react";
import styles from "./SingleProduct.module.css";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import AddToCartForm from "../../components/AddToCartForm/AddToCartForm";
import ProductDescription from "../../components/ProductDescription.js/ProductDescription";
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import { dataContext } from "../../context/dataContext";
import { withRouter } from "react-router-dom";
import fetchProduct from "../../utils/fetchProduct";
import Error404 from "../../components/Error404/Error404";
import { client, Query } from "@tilework/opus";

class SingleProduct extends Component {
  static contextType = dataContext;
  abortController = new AbortController();
  storeData = this.context;
  categories = this.storeData.categories;

  currentCategoryName = this.props.match.params.categoryName;
  currentProductId = this.props.match.params.productId;

  state = {
    product: null,
    loading: true,
  };

  getProductData = (product) => {
    this.setState({ product, loading: false });
  };

  componentDidMount() {
    client.setEndpoint("http://localhost:4000/");

    const product = new Query("product")
      .addArgument("id", "String!", this.currentProductId)
      .addFieldList([
        "id",
        "name",
        "gallery",
        "inStock",
        "description",
        "category",
        "brand",
        "attributes{id, name, type, items{displayValue, value, id}}",
        "prices{amount, currency{label, symbol}}",
      ]);

    client
      .post(product, this.abortController.signal)
      .then((data) => this.getProductData(data.product))
      .catch((err) => console.log(err));
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
