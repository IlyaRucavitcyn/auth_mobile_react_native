/**@flow */
import React, { Component } from 'react';
import {
    ListView, View
} from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection, Card } from './common';
import ListItem from './ListItem';


class AppointmentsList extends Component<any, any> {

    dataSource: Array<string>;

    createDataSource(source: any[]) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows(source);
        return dataSource;
    }

    render() {
        return (
            <Card>
                <View>
                    <CardSection>
                        <ListView
                            dataSource={this.createDataSource(this.props.userAppointments)}
                            renderRow={(rowData) => (
                                <ListItem
                                    menuText={`${rowData.staff.toUpperCase()}-${rowData.datetime}`}
                                    redirect={() => { }}
                                    title={rowData.staff} />
                            )}
                        />
                    </CardSection>
                    <CardSection>
                        <Button
                            onPress={this.props.onButtonPressed}>
                            Create New Appointment
                        </Button>
                    </CardSection>
                </View>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAppointments: state.userAppointments
    }
}

export default connect(mapStateToProps)(AppointmentsList);
