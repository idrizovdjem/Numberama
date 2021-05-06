import { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ScoreContext from './contexts/scoreContext';
import authService from './services/authService';

import Navigation from './components/Navigation/Navigation';
import Game from './components/Game/Game';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import Rankings from './components/Rankings/Rankings';

const App = () => {
	const [score, setScore] = useState(0);
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(authService.isUserAuthenticated());

	const updateScore = (points) => {
		setScore(oldScore => oldScore + points);
	}

	const requireAuthentication = (Component, props) => {
		if (authService.isUserAuthenticated() === false) {
			return <Login {...props} changeAuthenticationState={changeAuthenticationState} />
		}

		return <Component {...props} />;
	}

	const requireAnonymous = (Component, props) => {
		if (authService.isUserAuthenticated() === true) {
			return <Game {...props} updateScore={updateScore} />
		}

		return <Component {...props} />;
	}

	const changeAuthenticationState = (authState) => {
		setIsUserAuthenticated(authState);
	}

	return (
		<HashRouter>
			<Navigation isUserAuthenticated={isUserAuthenticated} changeAuthenticationState={changeAuthenticationState} />
			<ScoreContext.Provider value={score}>
				<Switch>
					<Route path='/rankings' exact component={Rankings} />
					<Route path='/login' exact render={(props) => requireAnonymous(Login, { ...props, changeAuthenticationState })} />
					<Route path='/register' exact render={(props) => requireAnonymous(Register, { ...props, changeAuthenticationState })} />
					<Route path='/game' exact render={(props) => requireAuthentication(Game, { ...props, updateScore })} />
					<Route path='/' render={(props) => requireAuthentication(Game, { ...props, updateScore })} />
				</Switch>
			</ScoreContext.Provider>
		</HashRouter>
	);
}

export default App;
