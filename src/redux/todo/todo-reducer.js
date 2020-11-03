import * as actionTypes from './todo-types';

const todoReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.ADD_TODO:
			return state;
		case actionTypes.ADD_TODO_ERR:
			return state;
		case actionTypes.DELETE_TODO:
			return state;
		default:
			return state;
	}
};

export default todoReducer;
