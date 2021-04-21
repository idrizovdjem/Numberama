import { useContext } from 'react';
import classes from './Game.module.css';

import scoreContext from '../../context/scoreContext';

import GameBoard from './GameBoard/GameBoard';
import SideBar from './SideBar/SideBar';

const Game = () => {
    const context = useContext(scoreContext);

    return (
        <div className={classes.Game}>
            <SideBar score={context.score} />
            <GameBoard updateScore={context.updateScore} />
        </div>
    );
}

export default Game;