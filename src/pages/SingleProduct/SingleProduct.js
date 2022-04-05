import React, { Component } from "react";
import styles from "./SingleProduct.module.css";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import AddToCartForm from "../../components/AddToCartForm/AddToCartForm";
import ProductDescription from "../../components/ProductDescription.js/ProductDescription";
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import { dataContext } from "../../context/dataContext";
import { withRouter } from "react-router-dom";

class SingleProduct extends Component {
  static contextType = dataContext;
  storeData = this.context;
  categories = this.storeData.categories;

  currentCategoryName = this.props.match.params.categoryName;
  currentProductId = this.props.match.params.productId;

  categoryObjFromAPI = this.categories.find(
    (category) => category.name === this.currentCategoryName
  );
  product = this.categoryObjFromAPI.products.find(
    (product) => product.id === this.currentProductId
  );

  render() {
    return (
      <main className={styles.singleProduct}>
        <ProductGallery product={this.product} />
        <div>
          <ProductTitle product={this.product} />
          <AddToCartForm product={this.product} />
          <ProductDescription description={this.product.description} />
        </div>
      </main>
    );
  }
}

export default withRouter(SingleProduct);

// export default class SingleProduct extends Component {
//   categoryObjFromAPI = this.props.categories.find(
//     (category) => category.name === this.props.currentCategoryName
//   );
//   product = this.categoryObjFromAPI.products.find(
//     (product) => product.id === this.props.currentProductId
//   );

//   render() {
//     return (
//       <main className={styles.singleProduct}>
//         <ProductGallery product={this.product} />
//         <div>
//           <ProductTitle product={this.product} />
//           <AddToCartForm
//             product={this.product}
//             addToCart={this.props.addToCart}
//           />
//           <ProductDescription description={this.product.description} />
//         </div>
//       </main>
//     );
//   }
// }
