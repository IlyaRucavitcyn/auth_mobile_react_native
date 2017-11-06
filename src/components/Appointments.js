import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import Picker from 'react-native-modal-selector';
import DatePicker from 'react-native-datepicker';
import { Card, CardSection } from './common';
import { menuItemNames } from './Menu';
import UserInfoState from '../state/userinfo.state';

@observer
export default class Appointments extends Component {
    static navigationOptions = {
        title: menuItemNames.APPOINTMENTS
    };
    state = {
        date: '',
        language: 'Java'
    }
    render() {
        const { labelStyle, containerStyle,
            dateStyle, selectStyle } = styles;


        const data = UserInfoState.userInfo.staffAvailable.map(
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
                        data={data}
                        initValue="Select spec for appointment"
                        style={selectStyle} />
                </CardSection>
                <CardSection>
                    <View style={containerStyle}>
                        <Text style={labelStyle}>Date</Text>
                        <DatePicker
                            style={dateStyle}
                            date={this.state.date}
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
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
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
        border: 'none'
    },
    selectStyle: {
        flex: 1,
        borderColor: '#FFF'
    }
};