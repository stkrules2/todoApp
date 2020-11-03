import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import HomePage from './pages/homepage/homepage.component';
import loginPage from './pages/loginPage/loginPage.component';

import Header from './components/header-component/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				await createUserProfileDocument(userAuth);
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div className="App">
				<Header />
				<Container>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/login" component={loginPage} />
					</Switch>
				</Container>
			</div>
		);
	}
}

export default App;
