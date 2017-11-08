/**@flow */
import * as React from 'react';
import { observer } from 'mobx-react';
import { menuItemNames } from './Menu';
import { Card, CardSection, Button, Input, ErrorMessageList } from './common';
import ErrorMessageGenerationService from '../services/error-message-generation.service';
import ValidationService from '../services/validation.service';
import UserInfoState from '../state/userinfo.state';

type PropTypes = {};
type StateTypes = {
    componentFormIsValid: boolean,
    componentIsDirty: boolean,
    editMode: boolean,
    firstName: string,
    lastName: string,
    age: string
}

@observer
export default class AccountDetails extends React.Component<PropTypes, StateTypes> {
    static navigationOptions = {
        title: menuItemNames.ACCOUNT_DETAILS
    };
    state: StateTypes;

    componentWillMount() {
        this.syncComponentWithState();
        this.setState({
            componentIsDirty: false,
            editMode: false,
        }, this.validateFormFields.bind(this))
    }
    syncComponentWithState() {
        this.setState({
            firstName: UserInfoState.userInfo.firstName,
            lastName: UserInfoState.userInfo.lastName,
            age: `${UserInfoState.userInfo.age ? UserInfoState.userInfo.age : ''}`,
        })
    }
    validateFormFields() {
        const formIsValid = ValidationService.isNotEmpty(this.state.firstName) &&
            ValidationService.isNotEmpty(this.state.lastName) &&
            ValidationService.isNotEmpty(this.state.age) &&
            ValidationService.isNumber(this.state.age);
        this.setState({ componentFormIsValid: formIsValid });
    }

    onInputChange() {
        if (!this.state.componentIsDirty) {
            this.setState({ componentIsDirty: true });
        }
        this.validateFormFields();
    }

    onFormSubmit() {
        UserInfoState.setNewUserInfo({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: Number(this.state.age),
        });
        this.setState({ editMode: false })
    }

    onFormCancelSubmit() {
        this.syncComponentWithState();
        this.setState({ editMode: false });
    }

    renderButtonBasedOnEditMode(): React.Node {
        if (this.state.editMode) {
            return (
                <CardSection>
                    <Button
                        onPress={this.onFormSubmit.bind(this)}
                        disabled={!this.state.componentFormIsValid}>
                        Save changes
                        </Button>
                    <Button
                        onPress={this.onFormCancelSubmit.bind(this)}>
                        Cancel
                    </Button>
                </CardSection>
            );
        }
        return (
            <CardSection>
                <Button
                    onPress={() => { this.setState({ editMode: true }) }}>
                    Edit profile
                </Button>
            </CardSection>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="Enter Your Firstname"
                        label="Firstname"
                        value={this.state.firstName}
                        editable={this.state.editMode}
                        onChangeText={firstName => {
                            this.setState({ firstName }, () => {
                                this.onInputChange();
                            });
                        }}
                    />
                </CardSection>
                <ErrorMessageList
                    messages={[
                        ErrorMessageGenerationService.generateRequireMessage(this.state.firstName)
                    ]}
                    shouldBeShown={this.state.componentIsDirty} />
                <CardSection>
                    <Input
                        placeholder="Enter Your Lastname"
                        label="Lastname"
                        value={this.state.lastName}
                        editable={this.state.editMode}
                        onChangeText={lastName => {
                            this.setState({ lastName }, () => {
                                this.onInputChange();
                            })
                        }}
                    />
                </CardSection>
                <ErrorMessageList
                    messages={[
                        ErrorMessageGenerationService.generateRequireMessage(this.state.lastName)
                    ]}
                    shouldBeShown={this.state.componentIsDirty} />
                <CardSection>
                    <Input
                        placeholder="Enter Your Age"
                        label="Age"
                        value={this.state.age}
                        editable={this.state.editMode}
                        onChangeText={age => {
                            this.setState({ age }, () => {
                                this.onInputChange();
                            });
                        }}
                    />
                </CardSection>
                <ErrorMessageList
                    messages={[
                        ErrorMessageGenerationService.generateRequireMessage(this.state.age),
                        ErrorMessageGenerationService.generateShouldBeNumberMessage(this.state.age)
                    ]}
                    shouldBeShown={this.state.componentIsDirty} />
                {this.renderButtonBasedOnEditMode()}
            </Card>
        );
    }
}