import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// Convert from function to class component so that we can store the state
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // Check if user is signed in. UserAuth is null if not signed in
      if (userAuth) {
        // createUserProfileDocument creates a user profile doc in firestore if one was not already present
        // then returns the userRef
        const userRef = await createUserProfileDocument(userAuth);

        // Subscribe to listen to any change to the date at userRef path, but also get back a snapshot of it.
        userRef.onSnapshot((snapShot) => {
          // Set the state with the snapshot data.
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            }
          });
        });
      }
      
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </switch>
      </div>
    );
  }
}

export default App;
