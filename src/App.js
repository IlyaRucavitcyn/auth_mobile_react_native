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
import { connect } from 'react-redux';


type PropType = {
  onLogging: any,
  loggedIn: boolean | null
};
type StateType = {
  loggedIn: boolean | null
};


class App extends Component<PropType, StateType> {

  firebase = FirebaseClient.getClient();

  componentWillMount(): void {
    this.firebase.initialize(FIREBASE_CONFIG);
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        UserInfoState.setFirebaseUserInfo(user);
        this.firebase.getData(user.uid)
          .then(data => {
            if (data) {
              UserInfoState.setNewUserInfo(data);
              if (data.appointments) {
                UserInfoState.setUserAppointments(data.appointments)
              }
            }
            UserInfoState.setReactions();
            return;
          });
        this.props.onLogging(true);
      } else {
        UserInfoState.setFirebaseUserInfo({});
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
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogging: loggedIn => {
      dispatch(loginAction(loggedIn))
    }
  }
}

export default observer(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
