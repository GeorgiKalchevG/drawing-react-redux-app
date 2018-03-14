/* eslint-disable no-underscore-dangle,import/prefer-default-export */
import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
