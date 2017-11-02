/**@flow */
import React, { Component } from 'react';
import {
    ListView,
} from 'react-native';
import MenuItem from './MenuItem';

class Menu extends Component<any, any> {
    dataSource: Array<string>;

    componentWillMount() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(['Account Details', 'Appointments'])
    }

    render() {
        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={(rowData) => <MenuItem menuText={rowData} />}
            />
        );
    }
}

export default Menu;
