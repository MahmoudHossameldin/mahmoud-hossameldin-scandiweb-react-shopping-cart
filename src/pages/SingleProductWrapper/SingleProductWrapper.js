import React, { Component } from "react";
import { DataContextConsumer } from "../../context/dataContext";
import { CartContextConsumer } from "../../context/cartContext";
import { withRouter } from "react-router-dom";
import SingleProduct from "../SingleProduct/SingleProduct";

class SingleProductWrapper extends Component {
  currentCategoryName = this.props.match.params.categoryName;
  currentProductId = this.props.match.params.productId;
  render() {
    return (
      <DataContextConsumer>
        {(storeData) => (
          <CartContextConsumer>
            {(cartData) => (
              <SingleProduct
                selectedCurrencySymbol={storeData.selectedCurrencySymbol}
                categories={storeData.categories}
                currentCategoryName={this.currentCategoryName}
                currentProductId={this.currentProductId}
                addToCart={cartData.addToCart}
              />
            )}
          </CartContextConsumer>
        )}
      </DataContextConsumer>
    );
  }
}

export default withRouter(SingleProductWrapper);
