/**@flow */
import * as React from 'react';
// import { View, Text } from 'react-native';
import { menuItemNames } from './Menu'
import { Card, CardSection, Button, Input } from './common'

type PropTypes = {};
type StateTypes = {
    editMode: boolean,
    firstName: string,
    lastName: string,
    age: number | null
}
export default class AccountDetails extends React.Component<PropTypes, StateTypes> {
    static navigationOptions = {
        title: menuItemNames.ACCOUNT_DETAILS
    };
    state = {
        editMode: false,
        firstName: '',
        lastName: '',
        age: null
    }
    renderButtonBasedOnEditMode(): React.Node {
        if (this.state.editMode) {
            return (
                <Button
                    onPress={() => { this.setState({ editMode: false }) }}
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
                <CardSection>
                    <Input
                        placeholder="Enter Your Lastname"
                        label="Lastname"
                        value={this.state.lastName}
                        editable={this.state.editMode}
                        onChangeText={lastName => this.setState({ lastName })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        placeholder="Enter Your Age"
                        label="Age"
                        value={this.state.age}
                        editable={this.state.editMode}
                        onChangeText={age => this.setState({ age: Number(age) })}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButtonBasedOnEditMode()}
                </CardSection>
            </Card>
        );
    }
}