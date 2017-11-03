/**@flow */
import * as React from 'react';
import { observer } from 'mobx-react';
import { menuItemNames } from './Menu';
import { Card, CardSection, Button, Input, ErrorMessage } from './common';
import ValidationService from '../services/validation.service';
import UserInfoState from '../state/userinfo.state';

type PropTypes = {};
type StateTypes = {
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
        this.setState({
            editMode: false,
            firstName: UserInfoState.userInfo.firstName,
            lastName: UserInfoState.userInfo.lastName,
            age: `${UserInfoState.userInfo.age ? UserInfoState.userInfo.age : ''}`,
        })
    }

    onFormSubmit() {
        UserInfoState.setNewUserInfo({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: Number(this.state.age),
        });
        this.setState({ editMode: false })
    }

    renderButtonBasedOnEditMode(): React.Node {
        if (this.state.editMode) {
            return (
                <Button
                    onPress={this.onFormSubmit.bind(this)}
                >
                    Save changes
                </Button>
            );
        }
        return (
            <Button
                onPress={() => { this.setState({ editMode: true }) }}
            >
                Edit profile
            </Button>
        );
    }

    renderError(message: string | null): React.Node {
        if (this.state.editMode) {
            return <ErrorMessage message={message} />
        }
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
                        onChangeText={firstName => this.setState({ firstName })}
                    />
                </CardSection>
                {this.renderError(ValidationService.isEmpty(this.state.firstName))}
                <CardSection>
                    <Input
                        placeholder="Enter Your Lastname"
                        label="Lastname"
                        value={this.state.lastName}
                        editable={this.state.editMode}
                        onChangeText={lastName => this.setState({ lastName })}
                    />
                </CardSection>
                {this.renderError(ValidationService.isEmpty(this.state.lastName))}
                <CardSection>
                    <Input
                        placeholder="Enter Your Age"
                        label="Age"
                        value={this.state.age}
                        editable={this.state.editMode}
                        onChangeText={age => this.setState({ age })}
                    />
                </CardSection>
                {this.renderError(
                    ValidationService.isEmpty(this.state.age) ||
                    ValidationService.isNumber(this.state.age)
                )}
                <CardSection>
                    {this.renderButtonBasedOnEditMode()}
                </CardSection>
            </Card>
        );
    }
}