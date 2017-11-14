/**
 * @flow 
 */
import * as React from 'react';
import { Header } from 'react-native-elements';
import { APP_COLORS } from '../../config/app-palette';

type Props = {
    headerText: string
};

const Head = (props: Props) => {
    return (
        <Header
            backgroundColor={APP_COLORS.MAIN_THEME}
            centerComponent={
                {
                    text: props.headerText,
                    style: { color: APP_COLORS.WHITE, fontSize: 20 }
                }
            }
            statusBarProps={
                { barStyle: "light-content" }
            }
        />
    );
};


export { Head };

