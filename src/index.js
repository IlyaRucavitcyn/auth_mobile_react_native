import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './state';

export const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

Root.displayName = "Root";