/**
 * @flow
 */
import type { Node } from 'react';
import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import FirebaseClient from './services/firebase-client';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { Spinner } from './components/common';
import PushNotificationComponent from './components/PushNotification'
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
        this.setState({ loggedIn: true });
      } else {
        UserInfoState.setFirebaseUserInfo({});
        this.setState({ loggedIn: false });
      }
    });
  }

  renderComponentLoggedIn() {
    switch (this.state.loggedIn) {
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
      <View>
        {this.renderComponentLoggedIn()}
        <PushNotificationComponent />
      </View>
    );
  }
}

export default observer(App);
