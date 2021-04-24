import { Fragment, useState } from 'react';
import classes from './GameBoard.module.css';

import numberService from '../../../services/numberService.js';

import GameButtons from '../GameButtons/GameButtons';
import NumberRow from '../NumberRow/NumberRow';

const GameBoard = (props) => {
    const initialRow = numberService.generateRow();
    const [gameBoard, setGameBoard] = useState([initialRow]);
    const [selectedBox, setSelectedBox] = useState(null);

    const addNewRowHandle = () => {
        // generate new row of numbers and add it to the game board
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
            // if a box is already selected

            // check if the newly selected box is the same as the first selected box
            if (selectedBox.row === row && selectedBox.col === col) {
                setSelectedBox({ row, col });
                return;
            }

            // get box indecies as 1D array
            const firstBoxIndex = 10 * selectedBox.row + selectedBox.col;
            const secondBoxIndex = 10 * row + col;

            // find the first and second box by row and column
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

            // get the box values
            const firstValue = gameBoard[lowerRow][lowerColumn];
            const secondValue = gameBoard[higherRow][higherColumn];

            // check if the boxes values are not equal or their sum is not equal to 10
            if (firstValue !== secondValue && firstValue + secondValue !== 10) {
                setSelectedBox({ row, col });
                return;
            }

            // check if the pair is possible horizontaly
            let isPossibleHorizontaly = true;

            let firstRow = lowerRow;
            let firstCol = lowerColumn + 1;

            // check horizontaly
            while (true) {
                // check if the firstCol is outside the array length
                if (firstCol === 10) {
                    firstCol = 0;
                    firstRow++;
                }

                // check if the first and highest coordinates are equal
                if (firstRow === higherRow && firstCol === higherColumn) {
                    break;
                }

                // get current box value
                const currentValue = gameBoard[firstRow][firstCol];
                // if the current box value is 0, then continue
                if (currentValue !== 0) {
                    // otherwise the pair is not possible horizontaly
                    isPossibleHorizontaly = false;
                    break;
                }

                firstCol++;
            }

            // if the pair is possible horizontaly
            if (isPossibleHorizontaly) {
                // update the game board by setting both values to 0
                setGameBoard(oldGameBoard => {
                    const newGameBoard = oldGameBoard.slice();
                    newGameBoard[selectedBox.row][selectedBox.col] = 0;
                    newGameBoard[row][col] = 0;
                    return newGameBoard;
                });

                // update score and set selected box to null
                props.updateScore(firstValue + secondValue);
                setSelectedBox(null);
                return;
            }

            // check if both boxes columns are same
            if (lowerColumn !== higherColumn) {
                setSelectedBox(null);
                return;
            }

            let isPossibleVerticaly = true;

             // check verticaly
            firstRow = lowerRow;
            firstCol = lowerColumn;
            for (let i = firstRow + 1; i < higherRow; i++) {
                // get the current box value
                const currentValue = gameBoard[i][firstCol];
                if (currentValue !== 0) {
                    // if the current box value is not 0(empty), then it's the pair is not possible verticaly
                    isPossibleVerticaly = false;
                    break;
                }
            }

            if (isPossibleVerticaly) {
                // if the pair is possible verticaly, update the game board
                setGameBoard(oldGameBoard => {
                    const newGameBoard = oldGameBoard.slice();
                    newGameBoard[selectedBox.row][selectedBox.col] = 0;
                    newGameBoard[row][col] = 0;
                    return newGameBoard;
                });

                // update score and set selected box to null
                props.updateScore(firstValue + secondValue);
                setSelectedBox(null);
                return;
            }

            setSelectedBox(null);
        }

    }

    const clearEmptyRows = () => {
        // filter the game board with only rows that are not empty(contain at least 1 digit different than 0)
        setGameBoard(oldGameBoard => {
            const rows = oldGameBoard.filter(row => row.some(num => num !== 0));
            return rows;
        });
    }

    const rows = [];
    gameBoard.forEach((row, index) => {
        let selectedBoxIndex = -1; 
        if(selectedBox !== null && selectedBox.row === index) {
            selectedBoxIndex = selectedBox.col;
        }

        rows.push(
            <NumberRow
                selectBox={selectBoxHandler}
                row={index}
                numbers={row}
                key={index}
                selectedBoxIndex={selectedBoxIndex}
            />
        );
    });

    return (
        <Fragment>
            <GameButtons clearRows={clearEmptyRows} addRow={addNewRowHandle} />
            <div className={classes.GameBoard}>
                {rows}
            </div>
        </Fragment>
    );
}

export default GameBoard;