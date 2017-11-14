/**@flow */
import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { menuItemNames } from './Menu';
import { ErrorMessageList } from './common';
import ErrorMessageGenerationService from '../services/error-message-generation.service';
import ValidationService from '../services/validation.service';
import type { UserInfo } from '../state/actions/user-info-action';
import { updateUserInfoAction } from '../state/actions/user-info-action';
import { APP_COLORS } from '../config/app-palette';

type PropTypes = {
    userInfo: UserInfo,
    uid: string,
    updateUserInfo: any
};

type StateTypes = {
    componentFormIsValid: boolean,
    componentIsDirty: boolean,
    editMode: boolean,
    firstName: string,
    lastName: string,
    age: string
}

class AccountDetails extends React.Component<PropTypes, StateTypes> {
    static navigationOptions = {
        title: menuItemNames.ACCOUNT_DETAILS.toUpperCase(),
        headerStyle: {
            backgroundColor: APP_COLORS.MAIN_THEME,
        },
        headerTintColor: APP_COLORS.WHITE
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
            firstName: this.props.userInfo.firstName,
            lastName: this.props.userInfo.lastName,
            age: `${this.props.userInfo.age ? this.props.userInfo.age : ''}`,
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
        this.props.updateUserInfo(this.props.uid, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: Number(this.state.age)
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
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-around',
                    marginTop: 30
                }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={this.onFormSubmit.bind(this)}
                            disabled={!this.state.componentFormIsValid}
                            title="Save changes"
                            backgroundColor={APP_COLORS.MAIN_THEME}
                            icon={
                                {
                                    name: 'ios-checkmark-circle-outline',
                                    type: 'ionicon',
                                    size: 20
                                }
                            }
                            borderRadius={5}
                            fontWeight="bold"
                            disabledStyle={
                                { backgroundColor: APP_COLORS.MAIN_THEME_DISABLED }
                            }
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={this.onFormCancelSubmit.bind(this)}
                            title="Cancel"
                            backgroundColor={APP_COLORS.RED}
                            icon={
                                {
                                    name: 'ios-close-circle-outline',
                                    type: 'ionicon',
                                    size: 20
                                }
                            }
                            borderRadius={5}
                            fontWeight="bold" />
                    </View>
                </View>
            );
        }
        return (
            <View style={{ marginTop: 30 }}>
                <Button
                    onPress={() => { this.setState({ editMode: true }) }}
                    title="Edit profile"
                    backgroundColor={APP_COLORS.MAIN_THEME}
                    icon={
                        {
                            name: 'edit',
                            type: 'entypo',
                            size: 20
                        }
                    }
                    borderRadius={5}
                    fontWeight="bold"
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: APP_COLORS.WHITE }}>
                <FormLabel>Firstname</FormLabel>
                <FormInput
                    placeholder="Enter Your Firstname"
                    value={this.state.firstName}
                    editable={this.state.editMode}
                    inputStyle={{ color: APP_COLORS.BLACK }}
                    onChangeText={firstName => {
                        this.setState({ firstName }, this.onInputChange.bind(this));
                    }}
                />
                <ErrorMessageList
                    messages={[
                        ErrorMessageGenerationService.generateRequireMessage(this.state.firstName)
                    ]}
                    shouldBeShown={this.state.componentIsDirty} />
                <FormLabel>Lastname</FormLabel>
                <FormInput
                    placeholder="Enter Your Lastname"
                    value={this.state.lastName}
                    editable={this.state.editMode}
                    inputStyle={{ color: APP_COLORS.BLACK }}
                    onChangeText={lastName => {
                        this.setState({ lastName }, this.onInputChange.bind(this));
                    }}
                />
                <ErrorMessageList
                    messages={[
                        ErrorMessageGenerationService.generateRequireMessage(this.state.lastName)
                    ]}
                    shouldBeShown={this.state.componentIsDirty} />
                <FormLabel>Age</FormLabel>
                <FormInput
                    placeholder="Enter Your Age"
                    label="Age"
                    value={this.state.age}
                    inputStyle={{ color: APP_COLORS.BLACK }}
                    editable={this.state.editMode}
                    onChangeText={age => {
                        this.setState({ age }, this.onInputChange.bind(this));
                    }}
                />
                <ErrorMessageList
                    messages={[
                        ErrorMessageGenerationService.generateRequireMessage(this.state.age),
                        ErrorMessageGenerationService.generateShouldBeNumberMessage(this.state.age)
                    ]}
                    shouldBeShown={this.state.componentIsDirty} />
                {this.renderButtonBasedOnEditMode()}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        uid: state.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: (uid, userInfo) => {
            dispatch(updateUserInfoAction(uid, userInfo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);