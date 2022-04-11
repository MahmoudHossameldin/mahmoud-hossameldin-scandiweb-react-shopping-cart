import React from "react";
import { client, CombinedField, Field, Query } from "@tilework/opus";

const dataContext = React.createContext();
const { Provider, Consumer } = dataContext;

class DataContextProvider extends React.Component {
  currencySymbolInLocalStorage = localStorage.getItem("selectedCurrencySymbol");
  state = {
    categories: [],
    currencies: [],
    error: null,
    selectedCategoryName: null,
    selectedCurrencySymbol: this.currencySymbolInLocalStorage || null,
  };

  changeSelectedCategory = (categoryName) => {
    this.setState({ selectedCategoryName: categoryName });
  };

  changeSelectedCurrency = (currencySymbol) => {
    this.setState({ selectedCurrencySymbol: currencySymbol });
  };

  componentDidMount() {
    client.setEndpoint("http://localhost:4000/");
    const categories = new Query("categories", true).addField("name");
    const currencies = new Query("currencies", true).addFieldList([
      "label",
      "symbol",
    ]);

    client
      .post(new CombinedField().add(categories).add(currencies))
      .then((data) =>
        this.setState({
          categories: data.categories,
          currencies: data.currencies,
          selectedCategoryName: data.categories[0].name,
          selectedCurrencySymbol:
            this.currencySymbolInLocalStorage || data.currencies[0].symbol,
          error: null,
        })
      )
      .catch((err) =>
        this.setState({
          error: err,
        })
      );
  }

  fetchCategoryProducts(category, { success, error, signal }) {
    const categoryProducts = new Query("category")
      .addArgument("input", "CategoryInput", { title: category })
      .addField(
        new Field("products").addFieldList([
          "id",
          "name",
          "brand",
          "gallery",
          "inStock",
          "attributes{id, name, type, items{displayValue, value, id}}",
          "prices{amount, currency{label, symbol}}",
        ])
      );

    client
      .post(categoryProducts, { signal })
      .then((result) => success(result.category.products))
      .catch((err) => error(err));
  }

  fetchProduct = (id, { signal, success, error }) => {
    const product = new Query("product")
      .addArgument("id", "String!", id)
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
      .post(product, { signal })
      .then((data) => success(data.product))
      .catch((err) => error(err));
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.selectedCurrencySymbol !== this.state.selectedCurrencySymbol
    ) {
      localStorage.setItem(
        "selectedCurrencySymbol",
        this.state.selectedCurrencySymbol
      );
    }
  };

  render() {
    const {
      categories,
      currencies,
      error,
      selectedCategoryName,
      selectedCurrencySymbol,
    } = this.state;
    const changeSelectedCategory = this.changeSelectedCategory;
    const changeSelectedCurrency = this.changeSelectedCurrency;
    const fetchProduct = this.fetchProduct;
    const fetchCategoryProducts = this.fetchCategoryProducts;

    return (
      <Provider
        value={{
          categories,
          currencies,
          error,
          selectedCategoryName,
          selectedCurrencySymbol,
          changeSelectedCategory,
          changeSelectedCurrency,
          fetchProduct,
          fetchCategoryProducts,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { DataContextProvider, dataContext, Consumer as DataContextConsumer };

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
