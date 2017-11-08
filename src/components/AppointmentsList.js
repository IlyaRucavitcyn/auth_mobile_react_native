/**@flow */
import React, { Component } from 'react';
import {
    ListView, View
} from 'react-native';
import { observer } from 'mobx-react';
import { Button, CardSection, Card } from './common';
import MenuItem from './MenuItem';
import UserInfoState from '../state/userinfo.state';

@observer
class AppointmentsList extends Component<any, any> {
    dataSource: Array<string>;
    componentWillMount() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(UserInfoState.userAppointments.slice())
    }
    render() {
        return (
            <Card>
                <View>
                    <CardSection>
                        <ListView
                            dataSource={this.dataSource}
                            renderRow={(rowData) => (
                                <MenuItem
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

export default AppointmentsList;
