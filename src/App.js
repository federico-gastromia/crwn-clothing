import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from './redux/user/user.actions'

// Convert from function to class component so that we can store the state
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props
    checkUserSession()
  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* Path does not need exact for category component to be rendered. Consider two cases:
          - <Route exact path="/shop" .. />
          In this case when we type /shop/hats the ShopPage does not get rendered because it responds only 
          to exactly /shop,therefore we do not get to add the Route /shop/:categoryId.
          - <Route path="/shop" .. />
          In this case when we type /shop/hats the Switch returns the first match -> /shop and React 
          renders the ShopPage component, then from the ShopPage we get the match.path and add the Route 
          with /shop/hats which returns our category. */}
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch((checkUserSession()),
)});

export default connect(mapStateToProps, mapDispatchToProps)(App);
