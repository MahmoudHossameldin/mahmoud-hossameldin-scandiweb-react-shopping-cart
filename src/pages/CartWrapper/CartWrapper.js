import React, { Component } from "react";
import { DataContextConsumer } from "../../context/dataContext";
import { CartContextConsumer } from "../../context/cartContext";
import Cart from "../Cart/Cart";

export default class CartWrapper extends Component {
  render() {
    return (
      <DataContextConsumer>
        {(storeData) => (
          <CartContextConsumer>
            {(cartData) => (
              <Cart
                selectedCurrencySymbol={storeData.selectedCurrencySymbol}
                productsInCart={cartData.productsInCart}
                changeAttributeValues={cartData.changeAttributeValues}
                changeQuantity={cartData.changeQuantity}
              />
            )}
          </CartContextConsumer>
        )}
      </DataContextConsumer>
    );
  }
}
