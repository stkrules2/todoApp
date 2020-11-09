import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../Testing/unitTest';

import CustomButton from './custom-button.component';
const children = 'testvalue';
const setUp = (props = {}) => {
	const component = shallow(<CustomButton>{children}</CustomButton>);
	return component;
};

describe('Custom button component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});
	test('It should render the button component', () => {
		const wrapper = findByTestAttr(component, 'custom-button');
		expect(wrapper.length).toBe(1);
	});
	test('It should have a children value', () => {
		const wrapper = findByTestAttr(component, 'custom-button');
		expect(component.props().children).toEqual(children);
	});
});
