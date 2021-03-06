/**@flow */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import FirebaseClient from '../services/firebase-client';
import {
    Spinner, ErrorMessageList, Head
} from './common';
import ErrorMessageGenerationService from '../services/error-message-generation.service';
import ValidationService from '../services/validation.service';
import { APP_COLORS } from '../config/app-palette';

class LoginForm extends Component<any, any> {
    firebase = FirebaseClient.getClient();
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
        componentFormIsValid: false,
        componentIsDirty: false
    };
    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        this.firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
    }
    onLoginFail() {
        this.setState({ error: 'Authentication failed', loading: false });
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }
    validateFormFields() {
        const isFormValid = ValidationService.isNotEmpty(this.state.email) &&
            ValidationService.isEmail(this.state.email) &&
            ValidationService.isNotEmpty(this.state.password);
        this.setState({ componentFormIsValid: isFormValid })

    }
    onInputChange() {
        if (!this.state.componentIsDirty) {
            this.setState({ componentIsDirty: true });
        }
        this.validateFormFields();
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button
                title='LOG IN'
                onPress={this.onButtonPress.bind(this)}
                disabled={!this.state.componentFormIsValid}
                backgroundColor={APP_COLORS.MAIN_THEME}
                icon={
                    { name: 'login', type: 'simple-line-icon' }
                }
                borderRadius={5}
                fontWeight="bold"
                disabledStyle={
                    { backgroundColor: APP_COLORS.MAIN_THEME_DISABLED }
                }
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Head
                    headerText="AUTHENTICATION"
                />
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        placeholder="email@host.com"
                        value={this.state.email}
                        secureTextEntry={false}
                        inputStyle={{ color: APP_COLORS.BLACK }}
                        onChangeText={email => {
                            this.setState({ email }, this.onInputChange.bind(this));
                        }} />
                    <ErrorMessageList
                        messages={[
                            ErrorMessageGenerationService.generateRequireMessage(this.state.email),
                            ErrorMessageGenerationService.generateShouldBeEmail(this.state.email)
                        ]}
                        shouldBeShown={this.state.componentIsDirty} />

                    <FormLabel>Password</FormLabel>
                    <FormInput
                        placeholder="password"
                        value={this.state.password}
                        secureTextEntry={true}
                        inputStyle={{ color: APP_COLORS.BLACK }}
                        onChangeText={password => {
                            this.setState({ password }, this.onInputChange.bind(this));
                        }} />
                    <ErrorMessageList
                        messages={[
                            ErrorMessageGenerationService.generateRequireMessage(this.state.password)
                        ]}
                        shouldBeShown={this.state.componentIsDirty} />
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                    {this.renderButton()}
                </View>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: APP_COLORS.RED
    }
};

export default LoginForm;
