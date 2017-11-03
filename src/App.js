/**
 * @flow
 */
import type { Node } from 'react';
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import FirebaseClient from './services/firebase-client';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import MenuNavigator from './navigation/menu-navigator';
import UserInfoState from './state/userinfo.state';

type PropType = {};
type StateType = {
  loggedIn: boolean | null
};


class App extends Component<PropType, StateType> {

  state = { loggedIn: null };
  firebase = FirebaseClient.getClient();

  componentWillMount(): void {
    this.firebase.initialize(FIREBASE_CONFIG);
    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        UserInfoState.setFirebaseUserInfo(user);
        this.firebase.getData(user.uid)
          .then(data => UserInfoState.setNewUserInfo(data));
        this.setState({ loggedIn: true });
      } else {
        UserInfoState.setFirebaseUserInfo({});
        this.setState({ loggedIn: false });
      }
    });
  }

  render(): Node {
    switch (this.state.loggedIn) {
      case true:
        return <MenuNavigator />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }
}

export default observer(App);
