import React from "react";
import { connect } from 'react-redux'

import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count"> 0 </span>
  </div>
);

// Map the dispatch of the action 'toggleCartHidden' to the props, so that the action can be called by the component. 
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(null, mapDispatchToProps)(CartIcon);