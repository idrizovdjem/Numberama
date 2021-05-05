import { useContext, useEffect } from 'react';

import authService from '../../services/authService';
import scoreContext from '../../contexts/scoreContext';

import GameBoard from './GameBoard/GameBoard';
import SideBar from './SideBar/SideBar';

const Game = (props) => {
    const score = useContext(scoreContext);

    useEffect(() => {
        setupGame();
    });

    const setupGame = async () => {
        const isRefreshSuccessfull = await authService.refreshSession();
        if(isRefreshSuccessfull === false) {
            // redirect to login
            console.log('failed refresh');
        }

        console.log('successfull refresh');        
        // start the game
    }

    return (
        <div>
            <SideBar score={score} />
            <GameBoard updateScore={props.updateScore} />
        </div>
    );
}

export default Game;