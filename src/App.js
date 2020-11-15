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

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

// Convert from function to class component so that we can store the state
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // Check if user is signed in. UserAuth is null if not signed in
      if (userAuth) {
        // createUserProfileDocument creates a user profile doc in firestore if one was not already present
        // then returns the userRef
        const userRef = await createUserProfileDocument(userAuth);

        // Subscribe to listen to any change to the date at userRef path, but also get back a snapshot of it.
        userRef.onSnapshot((snapShot) => {
          // Set the state with the snapshot data.
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
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
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
