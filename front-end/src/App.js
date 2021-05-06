import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import authService from './services/authService';

import Navigation from './components/Navigation/Navigation';
import Game from './components/Game/Game';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Rankings from './components/Rankings/Rankings';

const App = () => {
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(authService.isUserAuthenticated());

	const requireAuthentication = (Component, props) => {
		if (authService.isUserAuthenticated() === false) {
			return <Login {...props} changeAuthenticationState={changeAuthenticationState} />
		}

		return <Component {...props} />;
	}

	const requireAnonymous = (Component, props) => {
		if (authService.isUserAuthenticated() === true) {
			return <Game {...props} />
		}

		return <Component {...props} />;
	}

	const changeAuthenticationState = (authState) => {
		setIsUserAuthenticated(authState);
	}

	return (
		<BrowserRouter>
			<Navigation isUserAuthenticated={isUserAuthenticated} changeAuthenticationState={changeAuthenticationState} />
			<Switch>
				<Route path='/rankings' exact component={Rankings} />
				<Route path='/login' exact render={(props) => requireAnonymous(Login, { ...props, changeAuthenticationState })} />
				<Route path='/register' exact render={(props) => requireAnonymous(Register, { ...props, changeAuthenticationState })} />
				<Route path='/game' exact render={(props) => requireAuthentication(Game, { ...props })} />
				<Route path='/' render={(props) => requireAuthentication(Game, { ...props })} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
