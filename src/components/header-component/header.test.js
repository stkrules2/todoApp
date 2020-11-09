import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../Testing/unitTest';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from './header.component';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setUp = (props = {}) => {
	let store = mockStore({ firebase: { auth: { uid: undefined } } });
	if (props) {
		store = mockStore({ firebase: { auth: { uid: 'dummy' } } });
	}
	const component = mount(
		<BrowserRouter>
			<Header store={store} />
		</BrowserRouter>
	);
	return component;
};

describe('Header Component with user', () => {
	let component;
	beforeEach(() => {
		component = setUp(true);
	});
	test('It should render header component', () => {
		const wrapper = findByTestAttr(component, 'headerComponent');
		expect(wrapper.length).toBe(2);
	});
	test('It should render header brand', () => {
		const wrapper = findByTestAttr(component, 'headerBrand');
		expect(wrapper.length).toBe(4);
	});
	test('It should render logout link', () => {
		const wrapper = findByTestAttr(component, 'logoutLink');
		expect(wrapper.length).toBe(4);
	});
	test('It should not render login link', () => {
		const wrapper = findByTestAttr(component, 'loginLink');
		expect(wrapper.length).toBe(0);
	});
});

describe('Header component without user', () => {
	let component;
	beforeEach(() => {
		component = setUp(false);
	});
	test('It should not render logout link', () => {
		const wrapper = findByTestAttr(component, 'logoutLink');
		expect(wrapper.length).toBe(0);
	});
	test('It should render login link', () => {
		const wrapper = findByTestAttr(component, 'loginLink');
		expect(wrapper.length).toBe(5);
	});
});
