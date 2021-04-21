import { useContext } from 'react';

import scoreContext from '../../context/scoreContext';

import GameBoard from './GameBoard/GameBoard';
import SideBar from './SideBar/SideBar';

const Game = () => {
    const context = useContext(scoreContext);

    return (
        <div>
            <SideBar score={context.score} />
            <GameBoard updateScore={context.updateScore} />
        </div>
    );
}

export default Game;