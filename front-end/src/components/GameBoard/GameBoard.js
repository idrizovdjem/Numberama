import { useState, useEffect } from 'react';
import classes from './GameBoard.module.css';

import numberService from '../../services/numberService.js';

import NumberRow from '../NumberRow/NumberRow';

const GameBoard = () => {
    const initialRow = numberService.generateRow();
    const [ gameBoard, setGameBoard ] = useState([initialRow]);

    const rows = [];
    gameBoard.forEach((row, index) => {
        rows.push(<NumberRow numbers={row} key={index} />);
    });

    return (
        <div className={classes.GameBoard}>
            {rows}
        </div>
    );
}

export default GameBoard;