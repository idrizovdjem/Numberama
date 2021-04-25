import { useContext } from 'react';

import scoreContext from '../../context/scoreContext';

import GameBoard from './GameBoard/GameBoard';
import SideBar from './SideBar/SideBar';

const Game = (props) => {
    const score = useContext(scoreContext);

    return (
        <div>
            <SideBar score={score} />
            <GameBoard updateScore={props.updateScore} />
        </div>
    );
}

export default Game;