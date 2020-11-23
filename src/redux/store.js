import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

// Create the saga middleware, we are then going to add each saga to it
const sagaMiddleware = createSagaMiddleware();

// Used to catch functions sent to the store to debug
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Add the individual sagas
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
