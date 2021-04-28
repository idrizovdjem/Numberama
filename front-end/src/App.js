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
			<ScoreContext.Provider value={score}>
				<Navigation />
				<Switch>
					<Route path='/login' exact component={Login} />
					<Route path='/register' exact component={Register} />
					<Route path='/game' exact render={() => <Game updateScore={updateScore} />} />							
					<Route path='/' render={() => <Game updateScore={updateScore} />} />
				</Switch>
				<Footer />
			</ScoreContext.Provider>
		</HashRouter>
	);
}

export default App;
