import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { menuItemNames } from './Menu'

/**Temporary styles TODO delete when replaced */
const styles = {
    tempNavigation: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default class AccountDetails extends Component {
    static navigationOptions = {
        title: menuItemNames.ACCOUNT_DETAILS
    };

    render() {
        return (
            <View style={styles.tempNavigation}>
                <Text>{`${AccountDetails.navigationOptions.title} Screen`}</Text>
            </View>
        );
    }
}