/**@flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import AppointmentsList from './AppointmentsList';
import AppointmentDetails from './AppointmentDetails';

@observer
class Appointments extends Component<any, any> {
    static navigationOptions = {
        title: 'Appointments'
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
            <View>
                {this.componentToRender()}
            </View>
        );
    }
}

export default Appointments;
