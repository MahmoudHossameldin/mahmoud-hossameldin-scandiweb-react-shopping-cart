import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Error404 from "../../components/Error404/Error404";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import { dataContext } from "../../context/dataContext";
import styles from "./Category.module.css";

class Category extends Component {
  static contextType = dataContext;
  categories = this.context.categories;
  categoryURLParam = this.props.match.params.categoryName;

  componentDidMount() {
    // Change selected category based on URL parameter if category is visited any way other than clicking the navbar links
    this.categories.some((category) => {
      category.name === this.categoryURLParam &&
        this.context.changeSelectedCategory(this.categoryURLParam);
    });
  }

  render() {
    const storeData = this.context;
    const { selectedCategoryName } = storeData;
    const categoryExist = this.categories.some(
      (category) => category.name === this.props.match.params.categoryName
    );
    return categoryExist ? (
      <main className={styles.main}>
        <h2>
          {selectedCategoryName[0].toUpperCase() +
            selectedCategoryName.slice(1)}
        </h2>
        <div className={styles.productsList}>
          <ProductListItem />
        </div>
      </main>
    ) : (
      <Error404 />
    );
  }
}

export default withRouter(Category);
