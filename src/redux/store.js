import { getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer.js';

export const middleWares = [thunk];

export const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ getFirebase })));
