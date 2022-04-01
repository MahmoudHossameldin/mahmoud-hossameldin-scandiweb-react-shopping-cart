import React from "react";

const cartContext = React.createContext();
const { Provider, Consumer } = cartContext;

class CartContextProvider extends React.Component {
  state = {
    productsInCart: [],
  };

  addToCart = (product, selectedAttributes = null, quantity = 1) => {
    if (!product.inStock) return;

    // if (
    //   this.state.productsInCart.some(
    //     (productObj) => productObj.product.id === product.id
    //   )
    // ) {
    //   // if the product is already in cart, do nothing!
    // } else {
    //   this.setState({
    //     productsInCart: [
    //       ...this.state.productsInCart,
    //       {
    //         product: product,
    //         quantity: quantity,
    //         selectedAttributes: selectedAttributes,
    //       },
    //     ],
    //   });
    // }
    if (
      !this.state.productsInCart.some(
        (productObj) => productObj.product.id === product.id
      )
    ) {
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
    console.log(this.state.productsInCart);
    const { productsInCart } = this.state;
    const addToCart = this.addToCart;

    return (
      <Provider value={{ productsInCart, addToCart }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { CartContextProvider, cartContext, Consumer as CartContextConsumer };
