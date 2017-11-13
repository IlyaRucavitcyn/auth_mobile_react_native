/**@flow */
import React, { Component, Dimensions } from 'react';
import { Text, View } from 'react-native';
import { Header, FormLabel, FormInput, Button } from 'react-native-elements';
import FirebaseClient from '../services/firebase-client';
import {
    CardSection, Spinner, ErrorMessageList
} from './common';
import ErrorMessageGenerationService from '../services/error-message-generation.service';
import ValidationService from '../services/validation.service';

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
                disabled={!this.state.componentFormIsValid} />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    backgroundColor="#ccc"
                    centerComponent={{ text: 'AUTHENTICATION'}}
                    innerContainerStyles={{fontSize: 15}}
                />
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        placeholder="email@host.com"
                        value={this.state.email}
                        secureTextEntry={false}
                        inputStyle={{ color: '#000' }}
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
                        inputStyle={{ color: '#000' }}
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
        color: 'red'
    }
};

export default LoginForm;
