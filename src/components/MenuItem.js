/**@flow */
import React, { Component } from 'react';
import {
    Text, View,
    TouchableHighlight
} from 'react-native';

const styles = {
    menuItemContainerStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuTextStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    }
};


type PropType = {
    menuText: string,
};

class MenuItem extends Component<PropType, any> {
    render() {
        const {
            menuItemContainerStyle,
            menuTextStyle } = styles;
        return (
            <TouchableHighlight
                underlayColor="#E0E0DF"
                onPress={(event) => { console.log("EVENT", event) }}>
                <View style={menuItemContainerStyle}>
                    <Text style={menuTextStyle}>
                        {this.props.menuText}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default MenuItem;