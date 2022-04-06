import React from "react";

const cartContext = React.createContext();
const { Provider, Consumer } = cartContext;

class CartContextProvider extends React.Component {
  state = {
    productsInCart: [],
  };

  addToCart = (product, selectedAttributes = null, quantity = 1) => {
    if (!product.inStock) return;

    if (
      !this.state.productsInCart.some(
        (stateObj) => stateObj.product.id === product.id
      )
    ) {
      this.setState({
        productsInCart: [
          ...this.state.productsInCart,
          {
            product: product,
            selectedAttributes: selectedAttributes,
            quantity: quantity,
          },
        ],
      });
    }
  };

  changeAttributeValues = (productId, attributeId, attribute) => {
    const productIndex = this.state.productsInCart.findIndex(
      (productObj) => productObj.product.id === productId
    );

    this.setState((prevState) => ({
      productsInCart: [
        ...prevState.productsInCart.slice(0, productIndex),
        {
          ...prevState.productsInCart[productIndex],
          selectedAttributes: {
            ...prevState.productsInCart[productIndex].selectedAttributes,
            [attributeId]: attribute.id,
          },
        },
        ...prevState.productsInCart.slice(productIndex + 1),
      ],
    }));
  };

  changeQuantity = (product, amount) => {
    const productIndex = this.state.productsInCart.findIndex(
      (productObj) => productObj.product.id === product.id
    );

    if (
      this.state.productsInCart[productIndex].quantity === 1 &&
      amount === -1
    ) {
      this.setState((prevState) => ({
        productsInCart: [
          ...prevState.productsInCart.slice(0, productIndex),
          ...prevState.productsInCart.slice(productIndex + 1),
        ],
      }));
    } else {
      this.setState((prevState) => ({
        productsInCart: [
          ...prevState.productsInCart.slice(0, productIndex),
          {
            ...prevState.productsInCart[productIndex],
            quantity: prevState.productsInCart[productIndex].quantity + amount,
          },
          ...prevState.productsInCart.slice(productIndex + 1),
        ],
      }));
    }
  };

  render() {
    const { productsInCart } = this.state;
    const addToCart = this.addToCart;
    const changeQuantity = this.changeQuantity;
    const changeAttributeValues = this.changeAttributeValues;

    return (
      <Provider
        value={{
          productsInCart,
          addToCart,
          changeAttributeValues,
          changeQuantity,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { CartContextProvider, cartContext, Consumer as CartContextConsumer };
