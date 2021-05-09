import { useState, useEffect } from 'react';

import { INITIAL_SECONDS } from '../../constants/GameConstants';

import authService from '../../services/authService';
import scoreService from '../../services/scoreService';
import numberService from '../../services/numberService';

import GameBoard from './GameBoard/GameBoard';
import SideBar from './SideBar/SideBar';

const Game = (props) => {
	const [gameBoard, setGameBoard] = useState([]);
    const [score, setScore] = useState(0);
    const [seconds, setSeconds] = useState(INITIAL_SECONDS);

    useEffect(() => {
        setupGame();
    }, []);

    const submitScore = async () => {
        await scoreService.submitScore(score);
        props.history.push('/rankings');
    }

    const setupGame = async () => {
        // refresh user session
        if(authService.shouldRefresh()) {
            const isRefreshSuccessfull = await authService.refreshSession();
            if(isRefreshSuccessfull === false) {
                // if the refresh token is expired or is invalid
                // redirect to login page
                props.history.push('/login');
            }
        }

        // generate row and add it to the gameboard object
        const firstRow = numberService.generateRow();
        setGameBoard([firstRow]);
        setSeconds(INITIAL_SECONDS);
        setScore(0);
    }

    return (
        <div>
            <SideBar score={score} submit={submitScore} setup={setupGame} />
            <GameBoard 
                updateScore={setScore} 
                gameBoard={gameBoard} 
                setGameBoard={setGameBoard} 
                submit={submitScore} 
                seconds={seconds}
                setSeconds={setSeconds}
            />
        </div>
    );
}

export default Game;