import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Category from "./pages/Category/Category";
import CartWrapper from "./pages/CartWrapper/CartWrapper";
import SingleProductWrapper from "./pages/SingleProductWrapper/SingleProductWrapper";
import Header from "./components/Header/Header";
import FetchError from "./components/FetchError.js/FetchError";
import { dataContext } from "./context/dataContext";

import "./App.css";

class App extends React.Component {
  static contextType = dataContext;
  render() {
    const storeData = this.context;
    const { categories, error, selectedCategoryName } = storeData;
    return (
      <div className="App">
        {(categories.length && !error && (
          <>
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${selectedCategoryName}`} />
              </Route>
              <Route path="/cart">
                <CartWrapper />
              </Route>
              <Route path={"/:categoryName/:productId"}>
                <SingleProductWrapper />
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
