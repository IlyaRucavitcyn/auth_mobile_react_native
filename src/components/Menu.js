/**@flow */
import React, { Component } from 'react';
import {
    View, StatusBar
} from 'react-native';
import { List, Button } from 'react-native-elements';
import { ListItem } from './common';
import FirebaseClient from '../services/firebase-client';
import { mapNavigationNaming } from '../navigation/menu-navigator';
import { APP_COLORS } from '../config/app-palette';

export const menuItemNames = {
    ACCOUNT_DETAILS: 'Account Details',
    APPOINTMENTS: 'Appointments'
}

class Menu extends Component<any, any> {
    static navigationOptions = {
        title: 'MAIN MENU',
        headerStyle: {
            backgroundColor: APP_COLORS.MAIN_THEME,
        },
        headerTintColor: APP_COLORS.WHITE
    };

    firebase = FirebaseClient.getClient();
    dataSource: Array<string>;

    componentWillMount() {
        this.dataSource = Object.keys(mapNavigationNaming);
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: APP_COLORS.WHITE
            }}>
                <StatusBar
                    barStyle="light-content"
                />
                <View style={{ flex: 20, justifyContent: 'center' }}>

                    <List
                        containerStyle={{
                            marginBottom: 20,
                            width: '90%',
                            alignSelf: 'center',
                            borderColor: APP_COLORS.UNDERLAY_COLOR,
                            borderWidth: 1,
                            borderRadius: 5
                        }}
                    >
                        {this.dataSource.map((rowData, i) => (
                            <ListItem
                                key={i}
                                listItemText={rowData}
                                redirect={() => {
                                    navigate(mapNavigationNaming[rowData]);
                                }}
                                title={rowData}
                                leftIcon={
                                    {
                                        name: 'arrow-right-circle',
                                        type: 'simple-line-icon'
                                    }
                                }
                            />
                        ))
                        }
                    </List>
                </View>
                <View style={{ flex: 35, justifyContent: 'center' }}>
                    <Button
                        onPress={() => this.firebase.auth().signOut()}
                        backgroundColor={APP_COLORS.MAIN_THEME}
                        icon={
                            { name: 'logout', type: 'simple-line-icon' }
                        }
                        borderRadius={5}
                        fontWeight="bold"
                        title="LOG OUT" />
                </View>
            </View >
        );
    }
}

export default Menu;
