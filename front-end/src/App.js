import { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ScoreContext from './context/scoreContext';

import authService from './services/authService';

import Navigation from './components/Navigation/Navigation';
import Game from './components/Game/Game';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';

const App = () => {
	const [score, setScore] = useState(0);

	const updateScore = (points) => {
		setScore(oldScore => oldScore + points);
	}

	const requireAuthentication = (Component, props) => {
		if(authService.isUserAuthenticated() === false) {
			return <Login {...props} />
		}

		return <Component {...props} />;
	}

	const requireAnonymous = (Component, props) => {
		if(authService.isUserAuthenticated() === true) {
			return <Game {...props} updateScore={updateScore} />
		}

		return <Component {...props} />;
	}

	return (
		<HashRouter>
			<ScoreContext.Provider value={score}>
				<Navigation />
				<Switch>
					<Route path='/login' exact render={(props) => requireAnonymous(Login, props)} />
					<Route path='/register' exact render={(props) => requireAnonymous(Register, props)} />
					<Route path='/game' exact render={(props) => requireAuthentication(Game, {...props, updateScore })} />
					<Route path='/' render={(props) => requireAuthentication(Game, {...props, updateScore})} />
				</Switch>
				<Footer />
			</ScoreContext.Provider>
		</HashRouter>
	);
}

export default App;
