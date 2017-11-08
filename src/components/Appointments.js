import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import Picker from 'react-native-modal-selector';
import DatePicker from 'react-native-datepicker';
import { Card, CardSection, Button } from './common';
import { menuItemNames } from './Menu';
import UserInfoState from '../state/userinfo.state';
import FirebaseClient from '../services/firebase-client';


@observer
export default class Appointments extends Component {
    static navigationOptions = {
        title: menuItemNames.APPOINTMENTS
    };
    firebase = FirebaseClient.getClient();
    state = {
        datetime: '',
        staff: ''
    }
    onAppointmentSaved() {
        UserInfoState.addAppointment(this.state);
        console.log('SAVED', UserInfoState.userInfo.appointments);
    }
    render() {
        const { labelStyle,
            containerStyle,
            dateStyle,
            selectStyle } = styles;


        const staffAvailable = UserInfoState.staffAvailable.map(
            (employee, index) => ({
                index,
                key: index,
                value: employee,
                label: employee
            })
        )

        return (
            <Card>
                <CardSection>
                    <Picker
                        data={staffAvailable}
                        initValue="Please select the specialist"
                        style={selectStyle}
                        cancelText={`Cancel`}
                        onChange={(staff => this.setState({ staff: staff.value }))} />
                </CardSection>
                <CardSection>
                    <View style={containerStyle}>
                        <Text style={labelStyle}>Date</Text>
                        <DatePicker
                            style={dateStyle}
                            date={this.state.datetime}
                            mode="datetime"
                            placeholder="select date"
                            format="'MMMM Do YYYY, h:mm:ss a'"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginRight: 0
                                },
                                dateInput: {
                                    marginRight: 36,
                                    borderColor: '#fff'
                                }
                            }}
                            onDateChange={datetime => this.setState({ datetime })}
                        />
                    </View>
                </CardSection>
                <CardSection>
                    <Button
                        disabled={!this.state.datetime || !this.state.staff}
                        onPress={this.onAppointmentSaved.bind(this)}>
                        Save appointmen
                    </Button>
                </CardSection>
            </Card >
        );
    }
}

const styles = {
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    dateStyle: {
        flex: 2,
    },
    selectStyle: {
        flex: 1,
        borderColor: '#FFF'
    }
};