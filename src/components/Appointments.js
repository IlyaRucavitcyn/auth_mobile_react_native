import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { menuItemNames } from './Menu'


const styles = {
    tempNavigation: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default class Appointments extends Component {
    static navigationOptions = {
        title: menuItemNames.APPOINTMENTS
    };

    render() {
        return (
            <View style={styles.tempNavigation}>
                <Text>{`${Appointments.navigationOptions.title} Screen`}</Text>
            </View>
        );
    }
}