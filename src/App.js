/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { View } from 'react-native';
// import firebase from 'firebase';
import FirebaseClient from './services/firebase-client';
import { FIREBASE_CONFIG } from './config/firebase.config';
import {
  Header, Button,
  Spinner, Card,
  CardSection
} from './components/common';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';

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
        return (
          <Card>
            <Menu />
            <CardSection>
              <Button onPress={() => this.firebase.auth().signOut()}>
                LogOut
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render(): React.Node {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
