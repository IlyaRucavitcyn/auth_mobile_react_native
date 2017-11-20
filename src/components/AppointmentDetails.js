/**@flow */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ModalSelector from 'react-native-modal-selector';
import PushNotification from 'react-native-push-notification';
import DatePicker from 'react-native-datepicker';
import { menuItemNames } from './Menu';
import { addUserAppointmentsAction } from '../state/actions/user-appointments-action';
import FirebaseClient from '../services/firebase-client';
import { APP_COLORS } from '../config/app-palette';

type PopsType = {
    staffAvailable: string[],
    uid: string,
    addUserAppointment: any,
    onButtonPressed: any
}
type StateType = {
    datetime: string,
    staff: string
}
class AppointmentDetails extends Component<PopsType, StateType> {
    firebase = FirebaseClient.getClient();
    state = {
        datetime: '',
        staff: ''
    }
    onAppointmentSaved() {
        this.props.addUserAppointment(this.props.uid, this.state);
    }
    render() {
        const { labelStyle,
            dateStyle,
            selectStyle } = styles;


        const staffAvailable = this.props.staffAvailable.map(
            (employee, index) => ({
                index,
                key: index,
                value: employee,
                label: employee
            })
        )

        return (
            <View
                style={{
                    height:300,
                    justifyContent: 'center',
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                <View style={{
                    flex: 1,
                    padding: 20
                }}>
                    <ModalSelector
                        data={staffAvailable}
                        initValue="Please select the specialist"
                        style={selectStyle}
                        cancelText={`Cancel`}
                        onChange={(staff => this.setState({ staff: staff.value }))} />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                    <DatePicker
                        style={dateStyle}
                        date={this.state.datetime}
                        mode="datetime"
                        placeholder="Select date"
                        format="'MMMM Do YYYY, h:mm:ss a'"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 10,
                                top: 4,
                                marginRight: 0
                            },
                            dateInput: {
                                marginRight: 36,
                                borderColor: '#fff',
                                fontSize:20
                            }
                        }}
                        onDateChange={datetime => this.setState({ datetime })}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            disabled={!this.state.datetime || !this.state.staff}
                            onPress={() => {
                                this.onAppointmentSaved();
                                this.props.onButtonPressed()
                            }}
                            title="Save"
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
                            } />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={this.props.onButtonPressed.bind(this)}
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
            </View >
        );
    }
}

const styles = {
    labelStyle: {
        fontSize: 18,
        fontWeight:'bold',
        textAlign:'center',
        textAlignVerical:'center',
        paddingLeft: 20,
        paddingTop:20,
        flex: 1,
        alignContent:'center'
    },
    dateStyle: {
        flex: 4,
    },
    selectStyle: {
        flex: 1,
        alignItems:'center',
        borderColor: APP_COLORS.WHITE
    }
};

const mapStateToProps = state => {
    return {
        staffAvailable: state.staffAvailable,
        uid: state.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUserAppointment: (uid, appointment) => {
            dispatch(addUserAppointmentsAction(uid, appointment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetails);