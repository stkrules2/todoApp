import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import { store } from './redux/store';

import firebase from './firebase/firebase.utils';

import './index.css';

const rrfProps = {
	firebase,
	config: {},
	dispatch: store.dispatch,
	createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth))
		return (
			<div className="text-center">
				<div className="spinner-grow text-primary" style={{ width: '7rem', height: '7rem' }} role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	return children;
}

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<BrowserRouter>
				<AuthIsLoaded>
					<App />
				</AuthIsLoaded>
			</BrowserRouter>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
