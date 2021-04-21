import { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ScoreContext from './context/scoreContext';

import Navigation from './components/Navigation/Navigation';
import Game from './components/Game/Game';
import Login from './components/Login/Login';

const App = () => {
	const [score, setScore] = useState(0);

	const updateScore = (points) => {
		setScore(oldScore => oldScore + points);
	}

	return (
		<HashRouter>
			<Navigation />
			<Switch>
				<Route path='/game' exact>
					<ScoreContext.Provider value={{ score, updateScore }}>
						<Game />
					</ScoreContext.Provider>
				</Route>
				<Route path='/login' exact>
					<Login />
				</Route>
			</Switch>
		</HashRouter>
	);
}

export default App;
