/**@flow */
import * as React from 'react';
import { View } from 'react-native';
import { ErrorMessage } from './ErrorMessage';


type PropTypes = {
    messages: Array<string>,
}

const ErrorMessageList = ({ messages }: PropTypes): React.Node => {
    if (messages.length) {
        const errorsToBeShown = messages.map(
            (message, index) => <ErrorMessage key={index} message={message} />
        );
        return (
            <View>
                {errorsToBeShown}
            </View>
        );
    }
    return null;
};

export { ErrorMessageList };
