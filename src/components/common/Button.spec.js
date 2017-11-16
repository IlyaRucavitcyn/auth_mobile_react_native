import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

test('renders snapshot correctly', () => {
    const wrapper = shallow(
        <Button
            disabled={true}
            onPress={() => { }}>
            Testing
        </Button>
    );
    expect(wrapper).toMatchSnapshot();
});

test('inner text is passed correctly', () => {
    const wrapper = shallow(
        <Button>Testing text</Button>
    );
    expect(wrapper.childAt(0).childAt(0).text())
        .toEqual('Testing text');
});

test('disabling attribute is passed correctly', () => {
    const wrapper = shallow(
        <Button disabled={false}>Testing text</Button>
    );
    expect(wrapper.prop('disabled'))
        .toBe(false);
});

test('onPress attribute is passed correctly', () => {
    const wrapper = shallow(
        <Button onPress={() => "testing result"}>Testing text</Button>
    );
    expect(wrapper.prop('onPress')())
        .toBe("testing result");
});
