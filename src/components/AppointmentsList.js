/**@flow */
import React, { Component } from 'react';
import {
    View, ScrollView
} from 'react-native';
import { List, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { ListItem } from './common';
import { APP_COLORS } from '../config/app-palette';


class AppointmentsList extends Component<any, any> {

    dataSource: Array<string>;

    render() {
        return (
            <ScrollView>
                <List
                    containerStyle={{
                        marginBottom: 20,
                        width: '90%',
                        alignSelf: 'center',
                        borderColor: APP_COLORS.UNDERLAY_COLOR,
                        borderWidth: 1,
                        borderRadius: 5
                    }}
                >
                    {this.props.userAppointments.map((rowData, i) => (
                        <ListItem
                            key={i}
                            listItemText={`${rowData.staff.toUpperCase()}-${rowData.datetime}`}
                            redirect={() => { }}
                            title={`${rowData.staff.toUpperCase()}/${rowData.datetime}`}
                            leftIcon={
                                {
                                    name: 'arrow-right-circle',
                                    type: 'simple-line-icon'
                                }
                            }
                        />
                    ))
                    }
                </List>

                <Button
                    onPress={this.props.onButtonPressed}
                    title="Create New Appointment"
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
                />
            </ScrollView>

        );
    }
}

const mapStateToProps = state => {
    return {
        userAppointments: state.userAppointments
    }
}

export default connect(mapStateToProps)(AppointmentsList);
