import { takeLatest, call, put } from "redux-saga/effects";

import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

// Runs the asyncronous code once colled by the takeEvery
export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    // Yield the promise to the middleware. The middleware will suspend the saga until the promise is resolved.
    // Once the promise is completed the middleware resumes the saga with the output of the the collection ref. 
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // Exactly like dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

// Generator function that listens for a specific action type
export function* fetchCollectionStart() {
  // Once the generator ears the action it fires another generator function
  // The effect takes the latest call fired. Therefore if fetchCollectionAsync is still running while another 
  // fetchCollectionStart is fired, the previous saga is interrupted and the latest one is fired.
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}
