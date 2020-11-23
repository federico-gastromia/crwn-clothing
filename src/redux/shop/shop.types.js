const ShopActionTypes = {
  // starting to fetch the date, before any data gets actually fetched. First API call to firestore
  FETCH_COLLECTIONS_START: "FETCH_COLLECTIONS_START",
  // comes back with the data we tried to fetch
  FETCH_COLLECTIONS_SUCCESS: "FETCH_COLLECTIONS_SUCCESS",
  // failure to fetch data; connection is bad, server is down, do not have permissionion
  FETCH_COLLECTIONS_FAILURE: "FETCH_COLLECTIONS_FAILURE",
};

export default ShopActionTypes;
