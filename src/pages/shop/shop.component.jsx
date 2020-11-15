import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
// Since we need to store the data related to the collection on the shop page, we will make it a Class Component
const ShopPage = ({ match }) => {
  console.log(match)
  return (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);
}
export default ShopPage;
