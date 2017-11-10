import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootStore from './reducers';

export default createStore(
    rootStore,
    applyMiddleware(thunk)
);