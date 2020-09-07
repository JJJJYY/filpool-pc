import { createStore, compose } from 'redux';
import rootReducer from './reducers';

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    compose(
        // applyMiddleware(createLogger())
    ),
);

const store = configureStore();

export default store;
