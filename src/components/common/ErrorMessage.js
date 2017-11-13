/**@flow */
import * as React from 'react';
import { FormValidationMessage } from 'react-native-elements';

type PropTypes = {
    message: string | null,
}

const ErrorMessage = ({ message }: PropTypes): React.Node => {
    if (message) {
        return (
            <FormValidationMessage>{message}</FormValidationMessage>
        );
    }
    return null;
};

export { ErrorMessage };
