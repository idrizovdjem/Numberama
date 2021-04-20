import { Fragment, useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import SideBar from './components/SideBar/SideBar';

const App = () => {
	const [score, setScore] = useState(0);

	const updateScore = (points) => {
		setScore(oldScore => oldScore + points);
	}

	return (
		<Fragment>
			<SideBar score={score} />
			<GameBoard updateScore={updateScore} />
		</Fragment>
	);
}

export default App;
