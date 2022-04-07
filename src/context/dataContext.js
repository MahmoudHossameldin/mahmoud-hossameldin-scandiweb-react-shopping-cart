import React from "react";
import { client, CombinedField, Query } from "@tilework/opus";

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
    const categories = new Query("categories", true).addFieldList([
      "name",
      "products{id, name, brand, inStock, gallery, category, description, prices{amount, currency{label, symbol}}, attributes{id, name, type, items{displayValue, value, id}}}",
    ]);
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
