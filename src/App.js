import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Category from "./pages/Category/Category";
import Cart from "./pages/Cart/Cart";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Header from "./components/Header/Header";
import FetchError from "./components/FetchError.js/FetchError";
import { dataContext } from "./context/dataContext";

import "./App.css";

class App extends React.Component {
  static contextType = dataContext;
  render() {
    const storeData = this.context;
    const { categories, error } = storeData;
    return (
      <div className="App">
        {(categories.length && !error && (
          <>
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${categories[0].name}`} />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path={"/:categoryName/:productId"}>
                <SingleProduct />
              </Route>
              <Route path="/:categoryName">
                <Category />
              </Route>
            </Switch>
          </>
        )) ||
          (error && <FetchError error={error} />)}
      </div>
    );
  }
}

export default App;
