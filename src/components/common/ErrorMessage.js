/**@flow */
import * as React from 'react';
import { Text, View } from 'react-native';


const styles = {
    errorContainerStyle: {
        backgroundColor: '#FFF',
        paddingLeft: 25
    },
    errorMessageStyle: {
        color: 'red',
        fontSize: 15
    }
}


type PropTypes = {
    message: string | null,
}

const ErrorMessage = ({ message }: PropTypes): React.Node => {
    const { errorContainerStyle, errorMessageStyle } = styles;
    if (message) {
        return (
            <View style={errorContainerStyle}>
                <Text style={errorMessageStyle}>{message}</Text>
            </View>
        );
    }
    return null;
};

export { ErrorMessage };
