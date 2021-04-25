import { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ScoreContext from './context/scoreContext';

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

	return (
		<HashRouter>
			<Navigation />
			<Switch>
				<Route path='/game' exact>
					<ScoreContext.Provider value={score}>
						<Game updateScore={updateScore} />
					</ScoreContext.Provider>
				</Route>
				<Route path='/login' exact component={Login} />
				<Route path='/register' exact component={Register} />
			</Switch>
			<Footer />
		</HashRouter>
	);
}

export default App;
