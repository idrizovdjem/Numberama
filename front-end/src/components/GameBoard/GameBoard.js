import { Fragment, useState } from 'react';
import classes from './GameBoard.module.css';

import numberService from '../../services/numberService.js';

import GameButtons from '../GameButtons/GameButtons';
import NumberRow from '../NumberRow/NumberRow';

const GameBoard = () => {
    const initialRow = numberService.generateRow();
    const [gameBoard, setGameBoard] = useState([initialRow]);
    //const [gameBoard, setGameBoard] = useState([[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [9, 9, 8, 6, 5, 4, 3, 2, 1, 0]]);
    const [selectedBox, setSelectedBox] = useState(null);

    const addNewRowHandle = () => {
        const newRow = numberService.generateRow();
        setGameBoard(oldGameBoard => {
            const rows = oldGameBoard.map(row => row);
            rows.push(newRow);
            return rows;
        });
    }

    const selectBoxHandler = (row, col) => {
        if (selectedBox === null) {
            // select first box
            setSelectedBox({ row, col });
        } else {
            if (selectedBox.row === row && selectedBox.col === col) {
                return;
            }

            // select second box
            const firstBoxIndex = 10 * selectedBox.row + selectedBox.col;
            const secondBoxIndex = 10 * row + col;

            let lowerRow, lowerColumn, higherRow, higherColumn;
            if (firstBoxIndex > secondBoxIndex) {
                lowerRow = row;
                lowerColumn = col;
                higherRow = selectedBox.row;
                higherColumn = selectedBox.col;
            } else {
                lowerRow = selectedBox.row;
                lowerColumn = selectedBox.col;
                higherRow = row;
                higherColumn = col;
            }

            // console.log(`Lower Row: ${lowerRow} and Lower Column: ${lowerColumn}`);
            // console.log(`Higher Row: ${higherRow} and Higher Column: ${higherColumn}`);

            const firstValue = gameBoard[lowerRow][lowerColumn];
            const secondValue = gameBoard[higherRow][higherColumn];

            if (firstValue !== secondValue && firstValue + secondValue !== 10) {
                setSelectedBox(null);
                return;
            }

            let isPossibleHorizontaly = true;

            let firstRow = lowerRow;
            let firstCol = lowerColumn + 1;

            // check horizontaly
            while (true) {
                if (firstCol === 10) {
                    firstCol = 0;
                    firstRow++;
                }

                if (firstRow === higherRow && firstCol === higherColumn) {
                    break;
                }

                const currentValue = gameBoard[firstRow][firstCol];
                if (currentValue !== 0) {
                    isPossibleHorizontaly = false;
                    break;
                }

                firstCol++;
            }

            if (isPossibleHorizontaly) {
                setGameBoard(oldGameBoard => {
                    const newGameBoard = oldGameBoard.slice();
                    newGameBoard[selectedBox.row][selectedBox.col] = 0;
                    newGameBoard[row][col] = 0;
                    return newGameBoard;
                });

                setSelectedBox(null);
                return;
            }

            if(lowerColumn !== higherColumn) {
                setSelectedBox(null);
                return;   
            }

            let isPossibleVerticaly = true;

            // check verticaly
            firstRow = lowerRow;
            firstCol = lowerColumn;
            for (let i = firstRow + 1; i < higherRow; i++) {
                const currentValue = gameBoard[i][firstCol];
                if (currentValue !== 0) {
                    isPossibleVerticaly = false;
                    break;
                }
            }

            if (isPossibleVerticaly) {
                setGameBoard(oldGameBoard => {
                    const newGameBoard = oldGameBoard.slice();
                    newGameBoard[selectedBox.row][selectedBox.col] = 0;
                    newGameBoard[row][col] = 0;
                    return newGameBoard;
                });

                setSelectedBox(null);
                return;
            }

            setSelectedBox(null);
        }

    }

    const rows = [];
    gameBoard.forEach((row, index) => {
        rows.push(
            <NumberRow
                selectBox={selectBoxHandler}
                row={index}
                numbers={row}
                key={index}
            />
        );
    });

    return (
        <Fragment>
            <GameButtons addRow={addNewRowHandle} />
            <div className={classes.GameBoard}>
                {rows}
            </div>
        </Fragment>
    );
}

export default GameBoard;