import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../redux/root-reducer';
import { middleWares } from '../redux/store';

export const findByTestAttr = (component, attr) => {
	const wrapper = component.find(`[data-test='${attr}']`);
	return wrapper;
};

export const checkProps = (component, expectedProps) => {
	console.log(component.types);
	const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
	return propsErr;
};

export const testStore = (initialState) => {
	const createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore);
	return createStoreWithMiddleware(rootReducer, initialState);
};
