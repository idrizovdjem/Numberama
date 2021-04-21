import { useState } from 'react';
import Game from './components/Game/Game';

import ScoreContext from './context/scoreContext';

const App = () => {
	const [score, setScore] = useState(0);

	const updateScore = (points) => {
		setScore(oldScore => oldScore + points);
	}

	return (
		<ScoreContext.Provider value={{ score, updateScore }}>
			<Game />
		</ScoreContext.Provider>
	);
}

export default App;
