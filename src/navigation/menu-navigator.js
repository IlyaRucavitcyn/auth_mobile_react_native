import { StackNavigator } from 'react-navigation';
import React from 'react';
import { View, Text } from 'react-native';
import Menu from '../components/Menu';

const styles = {
    tempNavigation: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const AccountDetails = () => (
    <View style={styles.tempNavigation}>
        <Text> Account Details Screen</Text>
    </View>
);

const Appointments = () => (
    <View style={styles.tempNavigation}>
        <Text>Appointments Screen</Text>
    </View>
);

export const MenuNavigator = StackNavigator({
    Menu: {
        screen: Menu
    },
    AccountDetails: {
        screen: AccountDetails
    },
    Appointments: {
        screen: Appointments
    }
});

export const mapNavigation = {
    'Account Details':'AccountDetails',
    'Appointments':'Appointments'
}

export default MenuNavigator;