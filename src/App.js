/**
 * @flow
 */
import type { Node } from 'react';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import FirebaseClient from './services/firebase-client';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import MenuNavigator from './navigation/menu-navigator';
import UserInfoState from './state/userinfo.state';
/** Redux state management */
// import loggingReducer from './state/reducers/log-in-reducer';
import { loginAction } from './state/actions/log-in-action';
import { firebaseUidAction } from './state/actions/firebase-uid-action';
import type { UserInfo } from './state/actions/user-info-action';
import { setUserInfoAction } from './state/actions/user-info-action';
import { setAvailableStaffAction } from './state/actions/user-staff-available-action';
import { connect } from 'react-redux';


type PropType = {
  onLogging: any,
  setUid: any,
  setUserInfo: any,
  setStaffAvailable: any,
  loggedIn: boolean | null,
  uid: string | null
};
type StateType = {
  loggedIn: boolean | null,
  userInfo: UserInfo
};


class App extends Component<PropType, StateType> {

  firebase = FirebaseClient.getClient();

  componentWillMount(): void {
    this.firebase.initialize(FIREBASE_CONFIG);
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        UserInfoState.setFirebaseUserInfo(user);
        this.props.setUid(user.uid);
        this.firebase.getData(user.uid)
          .then(data => {
            if (data) {
              this.props.setUserInfo({
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age
              });
              this.props.setStaffAvailable(data.staffAvailable);
              if (data.appointments) {
                UserInfoState.setUserAppointments(data.appointments)
              }
            }
            UserInfoState.setReactions();
            return;
          });
        this.props.onLogging(true);
      } else {
        this.props.onLogging(false);
      }
    });
  }

  renderComponentLoggedIn() {
    switch (this.props.loggedIn) {
      case true:
        return <MenuNavigator />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render(): Node {
    return (
      this.renderComponentLoggedIn()
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    uid: state.uid,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogging: loggedIn => {
      dispatch(loginAction(loggedIn))
    },
    setUid: uid => {
      dispatch(firebaseUidAction(uid))
    },
    setUserInfo: userInfo => {
      dispatch(setUserInfoAction(userInfo))
    },
    setStaffAvailable: staffAvailable => {
      dispatch(setAvailableStaffAction(staffAvailable))
    }
  }
}

export default observer(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
