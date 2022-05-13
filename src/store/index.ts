import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducer';

const configureStore: any = (preloadedState?: any) => {
  const store = createStore(
    rootReducer(),
    preloadedState
    // compose(applyMiddleware(logger))
  );
  return store;
};

export default configureStore;
