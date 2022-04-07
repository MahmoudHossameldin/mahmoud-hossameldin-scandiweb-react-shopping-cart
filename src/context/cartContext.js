import React from "react";

const cartContext = React.createContext();
const { Provider, Consumer } = cartContext;

class CartContextProvider extends React.Component {
  cartItemsInLocalSotrage = JSON.parse(localStorage.getItem("productsInCart"));
  state = {
    productsInCart: this.cartItemsInLocalSotrage || [],
  };

  sameAttributes = (firstProductObj, secondProductObj) => {
    return JSON.stringify(firstProductObj) === JSON.stringify(secondProductObj);
  };

  addToCart = (product, selectedAttributes = null, quantity = 1) => {
    if (!product.inStock) return;

    const itemAlreadyInCart = this.state.productsInCart.filter(
      (stateObj) => stateObj.product.id === product.id
    );

    const sameAttrAlreadyInCart = () => {
      return itemAlreadyInCart.some((item) =>
        this.sameAttributes(item.selectedAttributes, selectedAttributes)
      );
    };

    const itemNotInCart = itemAlreadyInCart.length === 0;

    if (itemNotInCart || !sameAttrAlreadyInCart()) {
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

  changeQuantity = (itemObj, amount) => {
    const productIndex = this.state.productsInCart.findIndex(
      (productObj) =>
        productObj.product.id === itemObj.product.id &&
        this.sameAttributes(
          productObj.selectedAttributes,
          itemObj.selectedAttributes
        )
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

  changeAttributeValues = (productId, attributeId, attribute) => {
    // const productIndex = this.state.productsInCart.findIndex(
    //   (productObj) =>
    //     productObj.product.id === itemObj.product.id &&
    //     this.sameAttributes(
    //       productObj.selectedAttributes,
    //       itemObj.selectedAttributes
    //     )
    // );
    // this.setState((prevState) => ({
    //   productsInCart: [
    //     ...prevState.productsInCart.slice(0, productIndex),
    //     {
    //       ...prevState.productsInCart[productIndex],
    //       selectedAttributes: {
    //         ...prevState.productsInCart[productIndex].selectedAttributes,
    //         [attributeId]: attribute.id,
    //       },
    //     },
    //     ...prevState.productsInCart.slice(productIndex + 1),
    //   ],
    // }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.productsInCart !== this.state.productsInCart) {
      localStorage.setItem(
        "productsInCart",
        JSON.stringify(this.state.productsInCart)
      );
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
