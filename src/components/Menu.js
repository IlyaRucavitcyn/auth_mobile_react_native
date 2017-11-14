/**@flow */
import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { List, Button } from 'react-native-elements';
import { ListItem } from './common';
import FirebaseClient from '../services/firebase-client';
import { mapNavigationNaming } from '../navigation/menu-navigator';

export const menuItemNames = {
    ACCOUNT_DETAILS: 'Account Details',
    APPOINTMENTS: 'Appointments'
}

class Menu extends Component<any, any> {
    static navigationOptions = {
        title: 'Main Menu'
    };

    firebase = FirebaseClient.getClient();
    dataSource: Array<string>;

    componentWillMount() {
        this.dataSource = Object.keys(mapNavigationNaming);
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                <List>
                    {this.dataSource.map((rowData, i) => (
                        <ListItem
                            key={i}
                            listItemTextStyle={rowData}
                            redirect={() => {
                                navigate(mapNavigationNaming[rowData]);
                            }}
                            title={rowData} />
                    ))
                    }
                </List>

                <Button
                    onPress={() => this.firebase.auth().signOut()}
                    title="LOG OUT" />
            </View >
        );
    }
}

export default Menu;
