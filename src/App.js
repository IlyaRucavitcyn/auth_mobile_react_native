/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import FirebaseClient from './services/firebase-client';
import { FIREBASE_CONFIG } from './config/firebase.config';
import {
  Spinner
} from './components/common';
import LoginForm from './components/LoginForm';
import MenuNavigator from './navigation/menu-navigator';


type PropType = {
  header: string,
  tile: number
};
type StateType = {
  loggedIn: boolean | null
};

class App extends React.Component<PropType, StateType> {
  state = { loggedIn: null };
  firebase = FirebaseClient.getClient();

  componentWillMount() {
    this.firebase.initialize(FIREBASE_CONFIG);

    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent(): React.Node {
    switch (this.state.loggedIn) {
      case true:
        return <MenuNavigator />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render(): React.Node {
    return this.renderContent();
  }
}

export default App;
