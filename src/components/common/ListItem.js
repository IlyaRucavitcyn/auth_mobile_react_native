/**@flow */
import React, { Component } from 'react';
import {
    Text, View,
    TouchableHighlight
} from 'react-native';

const styles = {
    listItemContainerStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemTextStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    }
};


type PropType = {
    listItemTextStyle: string,
    redirect: any,
    title: string
};

class ListItem extends Component<PropType, any> {
    render() {
        const {
            listItemContainerStyle,
            listItemTextStyle } = styles;
        return (
            <TouchableHighlight
                underlayColor="#E0E0DF"
                onPress={this.props.redirect}
                title={this.props.title}>
                <View style={listItemContainerStyle}>
                    <Text style={listItemTextStyle}>
                        {this.props.listItemTextStyle}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export { ListItem };