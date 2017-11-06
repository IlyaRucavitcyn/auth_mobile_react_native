import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Picker from 'react-native-modal-selector';
import { Card, CardSection } from './common';
import { menuItemNames } from './Menu';
import DatePicker from 'react-native-datepicker';

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

        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
            { key: index++, label: 'Raspberries' },
            { key: index++, section: true, label: 'Vegetables' },
            { key: index++, label: 'Beets' },
            { key: index++, label: 'Red Peppers' },
            { key: index++, label: 'Radishes' },
            { key: index++, label: 'Radicchio' },
            { key: index++, label: 'Red Onions' },
            { key: index++, label: 'Red Potatoes' },
            { key: index++, label: 'Rhubarb' },
            { key: index++, label: 'Tomatoes' }
        ];

        return (
            <Card>
                <CardSection>
                    <Picker
                        data={data}
                        initValue="Select something!"
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