/**@flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import AppointmentsList from './AppointmentsList';
import AppointmentDetails from './AppointmentDetails';
import { APP_COLORS } from '../config/app-palette';

class Appointments extends Component<any, any> {
    static navigationOptions = {
        title: 'APPOINTMENTS',
        headerStyle: {
            backgroundColor: APP_COLORS.MAIN_THEME,
        },
        headerTintColor: APP_COLORS.WHITE
    };

    state = {
        addingAppointmentMode: false
    }

    onButtonPressed() {
        this.setState({
            addingAppointmentMode: !this.state.addingAppointmentMode
        })
    }

    componentToRender() {
        return (
            this.state.addingAppointmentMode
                ? <AppointmentDetails
                    onButtonPressed={this.onButtonPressed.bind(this)} />
                : <AppointmentsList
                    onButtonPressed={this.onButtonPressed.bind(this)} />
        );
    }

    render() {
        return (
            <View style={{ backgroundColor: APP_COLORS.WHITE, flex: 1 }}>
                {this.componentToRender()}
            </View>
        );
    }
}

export default Appointments;
