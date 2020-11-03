import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import todoReducer from './todo/todo-reducer';
import authReducer from './auth/auth.reducer';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	task: todoReducer,
	auth: authReducer,
});

export default rootReducer;
