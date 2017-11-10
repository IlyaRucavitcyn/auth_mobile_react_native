import { combineReducers } from 'redux';
import loggingReducer from './log-in-reducer';
import firebaseUidReducer from './firebase-uid-reducer'
import setUserInfoReducer from './user-info-reducer';
import setAvailableStaffReducer from './user-staff-available-reducer';

export default combineReducers({
    loggedIn: loggingReducer,
    uid: firebaseUidReducer,
    userInfo: setUserInfoReducer,
    staffAvailable: setAvailableStaffReducer
});