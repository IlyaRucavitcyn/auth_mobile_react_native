/**@flow */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import FirebaseClient from '../services/firebase-client';
import {
    Button, Card, CardSection,
    Input, Spinner, Header, ErrorMessageList
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
            .catch(() => {
                this.firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
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
                onPress={this.onButtonPress.bind(this)}
                disabled={!this.state.componentFormIsValid}>
                Log in
            </Button>
        );
    }

    renderError(...messages: (string | null)[]) {
        if (this.state.componentIsDirty) {
            return <ErrorMessageList messages={messages} />
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <Card>
                    <CardSection>
                        <Input
                            placeholder="email@host.com"
                            label="Email"
                            value={this.state.email}
                            onChangeText={email => {
                                this.setState({ email }, this.onInputChange.bind(this));
                            }}
                        />
                    </CardSection>
                    {this.renderError(
                        ErrorMessageGenerationService.generateRequireMessage(this.state.email),
                        ErrorMessageGenerationService.generateShouldBeEmail(this.state.email)
                    )}
                    <CardSection>
                        <Input
                            secureTextEntry
                            placeholder="password"
                            label="Password"
                            value={this.state.password}
                            onChangeText={password => {
                                this.setState({ password }, this.onInputChange.bind(this));
                            }}
                        />
                    </CardSection>
                    {this.renderError(
                        ErrorMessageGenerationService.generateRequireMessage(this.state.password)
                    )}
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
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
