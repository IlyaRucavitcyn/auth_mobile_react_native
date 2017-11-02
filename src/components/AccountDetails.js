import React, { Component } from 'react';
import { View, Text } from 'react-native';

const styles = {
    tempNavigation: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default class AccountDetails extends Component {
    static navigationOptions = {
        title: 'Account Details'
    };

    render() {
        return (
            <View style={styles.tempNavigation}>
                <Text>Account Details Screen</Text>
            </View>
        );
    }
}