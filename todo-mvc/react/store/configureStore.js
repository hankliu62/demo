import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(logger)
)(createStore)

const configureStore = (initialState) => {
  const store = finalCreateStore(rootReducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers');
      store.replaceReducer(nextReducers);
    });
  }

  return store;
}

export default configureStore();
