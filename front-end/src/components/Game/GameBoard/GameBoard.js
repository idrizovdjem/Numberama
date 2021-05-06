import { useState, useEffect } from 'react';
import classes from './GameBoard.module.css';

import numberService from '../../../services/numberService.js';

import Timer from '../Timer/Timer';
import GameButtons from '../GameButtons/GameButtons';
import NumberRow from '../NumberRow/NumberRow';

const GameBoard = (props) => {
    const [seconds, setSeconds] = useState(600);
	const [selectedBox, setSelectedBox] = useState(null);
	const [firstHintBox, setFirstHintBox] = useState(null);
	const [secondHintBox, setSecondHintBox] = useState(null);

    // TODO: submit score
    useEffect(() => {
        // create timer which if your time runs out, submits your score and resets game
        const timer = setInterval(() => {;
            setSeconds(oldSeconds => {
                if(oldSeconds === 1) {
                    clearInterval(timer);
                }
                return oldSeconds - 1;
            });
        }, 1000);
    }, []);

    const addNewRowHandle = () => {
        // generate new row of numbers and add it to the game board
        const newRow = numberService.generateRow();
        props.setGameBoard(oldGameBoard => {
            return [...oldGameBoard, newRow];
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
            const firstValue = props.gameBoard[lowerRow][lowerColumn];
            const secondValue = props.gameBoard[higherRow][higherColumn];

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
                const currentValue = props.gameBoard[firstRow][firstCol];
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
                props.setGameBoard(oldGameBoard => {
                    const newGameBoard = oldGameBoard.slice();
                    newGameBoard[selectedBox.row][selectedBox.col] = 0;
                    newGameBoard[row][col] = 0;
                    return newGameBoard;
                });

                // update score and set selected box to null
                setFirstHintBox(null);
                setSecondHintBox(null);
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
                const currentValue = props.gameBoard[i][firstCol];
                if (currentValue !== 0) {
                    // if the current box value is not 0(empty), then it's the pair is not possible verticaly
                    isPossibleVerticaly = false;
                    break;
                }
            }

            if (isPossibleVerticaly) {
                // if the pair is possible verticaly, update the game board
                props.setGameBoard(oldGameBoard => {
                    const newGameBoard = oldGameBoard.slice();
                    newGameBoard[selectedBox.row][selectedBox.col] = 0;
                    newGameBoard[row][col] = 0;
                    return newGameBoard;
                });

                // update score and set selected box to null
                setFirstHintBox(null);
                setSecondHintBox(null);
                props.updateScore(firstValue + secondValue);
                setSelectedBox(null);
                return;
            }

            setSelectedBox(null);
        }

    }

    const clearEmptyRows = () => {
        // filter the game board with only rows that are not empty(contain at least 1 digit different than 0)
        props.setGameBoard(oldGameBoard => {
            const rows = oldGameBoard.filter(row => row.some(num => num !== 0));
            return rows;
        });
    }

    const hintHandler = () => {
        // check every digit if it has pair horizontaly and then verticaly

        // check horizontaly
        for (let i = 0; i < props.gameBoard.length; i++) {
            for (let j = 0; j < props.gameBoard[i].length; j++) {
                // get current check box value
                const currentValue = props.gameBoard[i][j];
                if (currentValue === 0) {
                    continue;
                }

                let isPossible = true;
                for (let k = i; k < props.gameBoard.length; k++) {
                    if (!isPossible) {
                        break;
                    }

                    // set the start for second current box column
                    const start = k === i ? j + 1 : 0;
                    for (let l = start; l < props.gameBoard[k].length; l++) {

                        // get second current box value
                        const secondCurrentValue = props.gameBoard[k][l];
                        if (secondCurrentValue === 0) {
                            continue;
                        }

                        // if the current box and second current box sum is 10
                        // then we have a hint
                        if (currentValue + secondCurrentValue === 10) {
                            setFirstHintBox({ row: i, col: j });
                            setSecondHintBox({ row: k, col: l });
                            return;
                        }

                        // if both values are not equal break the loop
                        if (secondCurrentValue !== currentValue) {
                            isPossible = false;
                            break;
                        }

                        // if both values are pair set the hint indexes and break
                        if (currentValue === secondCurrentValue) {
                            setFirstHintBox({ row: i, col: j });
                            setSecondHintBox({ row: k, col: l });
                            return;
                        }
                    }
                }
            }
        }

        // check verticaly
        for (let i = 0; i < props.gameBoard.length; i++) {
            for (let j = 0; j < props.gameBoard[i].length; j++) {
                // get current box value
                const currentValue = props.gameBoard[i][j];

                for (let k = i + 1; k < props.gameBoard.length; k++) {
                    // get second current value
                    const secondCurrentValue = props.gameBoard[k][j];
                    if (secondCurrentValue === 0) {
                        continue;
                    }

                    // if current value and second current value sum is equal to 10, then we have a hint
                    if (currentValue + secondCurrentValue === 10) {
                        setFirstHintBox({ row: i, col: j });
                        setSecondHintBox({ row: k, col: j });
                        return;
                    }

                    // if we have a pair set the hint idexes and return
                    if (currentValue === secondCurrentValue) {
                        setFirstHintBox({ row: i, col: j });
                        setSecondHintBox({ row: k, col: j });
                        return;
                    }

                    // if both values are different break the loop
                    if (currentValue !== secondCurrentValue) {
                        break;
                    }
                }
            }
        }
    }

    // map the gameboard rows to number rows
    const rows = props.gameBoard.map((row, index) => {
        let selectedBoxIndex = -1;
        if (selectedBox !== null && selectedBox.row === index) {
            selectedBoxIndex = selectedBox.col;
        }

        return (
            <NumberRow
                selectBox={selectBoxHandler}
                row={index}
                numbers={row}
                key={index}
                selectedBoxIndex={selectedBoxIndex}
                hintBoxes={[firstHintBox, secondHintBox]}
            />
        );
    });

    return (
        <div className={classes.GameBoardContainer}>
            <Timer seconds={seconds} />
            <GameButtons
                clearRows={clearEmptyRows}
                addRow={addNewRowHandle}
                hint={hintHandler}
            />
            
            <div className={classes.GameBoard}>
                {rows}
            </div>
        </div>
    );
}

export default GameBoard;