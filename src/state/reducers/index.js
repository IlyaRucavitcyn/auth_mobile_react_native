import { combineReducers } from 'redux';
import loggingReducer from './log-in-reducer';

export default combineReducers({
    loggedIn: loggingReducer
});