import 'react-native';
import { TextInput } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { Input } from './Input';

describe("Input element testing", () => {

    let props;
    const label = "Testing label";
    const value = "";
    const placeholder = "Testing placeholder";
    const secureTextEntry = null;
    const editable = null;

    beforeEach(() => {
        props = {
            label,
            value,
            placeholder,
            secureTextEntry,
            editable,
            onChangeText: jest.fn()
        }
    });

    test('renders snapshot correctly', () => {
        const wrapper = shallow(
            <Input {...props} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('passes props correctly', () => {
        const updatedProps = {
            label: "New test label",
            placeholder: "New test placeholder",
            secureTextEntry: true,
            editable: true
        }
        Object.assign(props, updatedProps)
        const wrapper = shallow(
            <Input {...props} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('runs eventListener when input has been changed', () => {
        const wrapper = shallow(
            <Input
                {...props} />
        );
        wrapper.find(TextInput).simulate("ChangeText", "test text");
        expect(props.onChangeText).toHaveBeenCalledWith("test text");
    });

});