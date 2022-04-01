import React from "react";

const cartContext = React.createContext();
const { Provider } = cartContext;

class CartContextProvider extends React.Component {
  state = {
    productsInCart: [],
  };

  addToCart = (product, quantity = 1, selectedAttributes = null) => {
    if (!product.inStock) return;

    if (
      this.state.productsInCart.some(
        (productObj) => productObj.product.id === product.id
      )
    ) {
      // if the product is already in cart, do nothing!
    } else {
      this.setState({
        productsInCart: [
          ...this.state.productsInCart,
          {
            product: product,
            quantity: quantity,
            selectedAttributes: selectedAttributes,
          },
        ],
      });
    }
  };

  render() {
    const { productsInCart } = this.state;
    const addToCart = this.addToCart;

    return (
      <Provider value={{ productsInCart, addToCart }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { CartContextProvider, cartContext };
