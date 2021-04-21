import { Fragment, useState } from 'react';
import ScoreContext from './context/scoreContext';

import Navigation from './components/Navigation/Navigation';
import Game from './components/Game/Game';

const App = () => {
	const [score, setScore] = useState(0);

	const updateScore = (points) => {
		setScore(oldScore => oldScore + points);
	}

	return (
		<Fragment>
			<Navigation />
			<ScoreContext.Provider value={{ score, updateScore }}>
				<Game />
			</ScoreContext.Provider>
		</Fragment>
	);
}

export default App;
