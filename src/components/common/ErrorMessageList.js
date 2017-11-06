/**@flow */
import * as React from 'react';
import { View } from 'react-native';
import { ErrorMessage } from './ErrorMessage';


type PropTypes = {
    messages: Array<string>,
    shouldBeShown?: boolean
}

const ErrorMessageList = ({ messages, shouldBeShown }: PropTypes): React.Node => {
    if (shouldBeShown && messages.length) {
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
