/**@flow */
import React, { Component } from 'react';
import {
    ListView, View
} from 'react-native';
import {
    Button,
    CardSection,
} from './common';
import MenuItem from './MenuItem';
import FirebaseClient from '../services/firebase-client';
import { mapNavigationNaming } from '../navigation/menu-navigator';

export const menuItemNames = {
    ACCOUNT_DETAILS: 'Account Details',
    APPOINTMENTS:    'Appointments'
}

class Menu extends Component<any, any> {
    static navigationOptions = {
        title: 'Main Menu'
    };

    firebase = FirebaseClient.getClient();
    dataSource: Array<string>;

    componentWillMount() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows([...Object.keys(mapNavigationNaming)])
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View>
                <CardSection>
                    <ListView
                        dataSource={this.dataSource}
                        renderRow={(rowData) => (
                            <MenuItem
                                menuText={rowData}
                                redirect={() => {
                                    navigate(mapNavigationNaming[rowData]);
                                }}
                                title={rowData} />
                        )}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={() => this.firebase.auth().signOut()}>
                        LogOut
                    </Button>
                </CardSection>

            </View>
        );
    }
}

export default Menu;
