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
        // refresh user session
        const isRefreshSuccessfull = await authService.refreshSession();
        if(isRefreshSuccessfull === false) {
            // if the refresh token is expired or is invalid
            // redirect to login page
            props.history.push('/login');
        }

        // generate row and add it to the gameboard object
        const firstRow = numberService.generateRow();
        setGameBoard([firstRow]);
    }

    return (
        <div>
            <SideBar score={score} submit={submitScore} setup={setupGame} />
            <GameBoard updateScore={props.updateScore} gameBoard={gameBoard} setGameBoard={setGameBoard} />
        </div>
    );
}

export default Game;