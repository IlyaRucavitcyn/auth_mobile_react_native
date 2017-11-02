import React, { Component } from 'react';
import { View, Text } from 'react-native';

const styles = {
    tempNavigation: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default class Appointments extends Component {
    static navigationOptions = {
        title: 'Appointments'
    };

    render() {
        return (
            <View style={styles.tempNavigation}>
                <Text>Appointments Screen</Text>
            </View>
        );
    }
}