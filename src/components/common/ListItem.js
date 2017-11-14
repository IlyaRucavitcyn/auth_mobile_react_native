/**@flow */
import React, { Component } from 'react';
import { ListItem as ListElement } from 'react-native-elements';
import { APP_COLORS } from '../../config/app-palette';

type PropType = {
    listItemText: string,
    redirect: any,
    title: string,
    leftIcon: any
};

class ListItem extends Component<PropType, any> {
    render() {
        return (
            <ListElement
                containerStyle={{ borderWidth: 0 }}
                underlayColor={APP_COLORS.UNDERLAY_COLOR}
                onPress={this.props.redirect}
                title={this.props.title}
                leftIcon={this.props.leftIcon}
            />
        );
    }
}

export { ListItem };