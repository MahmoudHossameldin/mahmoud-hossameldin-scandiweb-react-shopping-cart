import React, { Component } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../../context/dataContext";

import styles from "./CategoryMenu.module.css";

class CategoryMenu extends Component {
  static contextType = dataContext;

  render() {
    const storeData = this.context;
    const { categories, selectedCategoryName, changeSelectedCategory } =
      storeData;

    return (
      <ul className={styles.menu}>
        {categories.map((category) => (
          <Link
            to={`/${category.name}`}
            key={category.name}
            onClick={() => changeSelectedCategory(category.name)}
          >
            <li
              className={`${
                category.name === selectedCategoryName ? styles.selected : ""
              }`}
            >
              <p>{category.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    );
  }
}

export default CategoryMenu;
