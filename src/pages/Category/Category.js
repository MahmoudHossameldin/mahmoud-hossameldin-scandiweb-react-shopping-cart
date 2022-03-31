import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import { dataContext } from "../../context/dataContext";
import styles from "./Category.module.css";

class Category extends Component {
  static contextType = dataContext;

  componentDidMount() {
    // Change selected category based on URL parameter if category is visited any way other than clicking the navbar links
    const categories = this.context.categories;
    const categoryURLParam = this.props.match.params.categoryName;
    categories.some((category) => {
      category.name === categoryURLParam &&
        this.context.changeSelectedCategory(categoryURLParam);
    });
  }

  render() {
    const storeData = this.context;
    const { selectedCategoryName } = storeData;
    return (
      <main className={styles.main}>
        <h2>
          {selectedCategoryName[0].toUpperCase() +
            selectedCategoryName.slice(1)}
        </h2>
        <div className={styles.productsList}>
          <ProductListItem />
        </div>
      </main>
    );
  }
}

export default withRouter(Category);
