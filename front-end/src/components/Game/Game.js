import { useState, useContext, useEffect } from 'react';

import authService from '../../services/authService';
import scoreService from '../../services/scoreService';
import numberService from '../../services/numberService';

import scoreContext from '../../contexts/scoreContext';

import GameBoard from './GameBoard/GameBoard';
import SideBar from './SideBar/SideBar';

const Game = (props) => {
	const [gameBoard, setGameBoard] = useState([]);
    const score = useContext(scoreContext);

    useEffect(() => {
        setupGame();
    }, []);

    // TODO: Implement
    const submitScore = async () => {
        const response = await scoreService.submitScore(score);
        props.history.push('/rankings');
    }

    const setupGame = async () => {
        const isRefreshSuccessfull = await authService.refreshSession();
        if(isRefreshSuccessfull === false) {
            props.history.push('/login');
            return;
        }

        const firstRow = numberService.generateRow();
        setGameBoard(oldGameBoard => {
            return [firstRow];
        });
    }

    return (
        <div>
            <SideBar score={score} submit={submitScore} setup={setupGame} />
            <GameBoard updateScore={props.updateScore} gameBoard={gameBoard} setGameBoard={setGameBoard} />
        </div>
    );
}

export default Game;