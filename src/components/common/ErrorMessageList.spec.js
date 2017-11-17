import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { ErrorMessageList } from './ErrorMessageList';

test('renders snapshot correctly', () => {
    const wrapper = shallow(
        <ErrorMessageList
            messages={["testing message"]}
            shouldBeShown={true} />
    );
    expect(wrapper).toMatchSnapshot();
});

test('messages should be passed correctly', () => {
    const wrapper = shallow(
        <ErrorMessageList
            messages={["testing message 1", "testing message 2"]}
            shouldBeShown={true} />
    );
    expect(wrapper.children()).toHaveLength(2);
});

test('visibility flag should be passed correctly', () => {
    const wrapper = shallow(
        <ErrorMessageList
            messages={["testing message 1", "testing message 2"]}
            shouldBeShown={false} />
    );
    expect(wrapper.children()).toHaveLength(0);
});