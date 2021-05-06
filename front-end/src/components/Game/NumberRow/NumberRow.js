import classes from './NumberRow.module.css';

import NumberBox from './NumberBox/NumberBox';

const NumberRow = (props) => {
    const boxes = [];

    props.numbers.forEach((number, index) => {
        let isHint = false;

        if(props.hintBoxes[0] !== null && props.hintBoxes[0].row === props.row && props.hintBoxes[0].col === index) {
            isHint = true;
        } else if(props.hintBoxes[1] !== null && props.hintBoxes[1].row === props.row && props.hintBoxes[1].col === index) {
            isHint = true;
        }

        boxes.push(
            <NumberBox 
                selectBox={props.selectBox} 
                index={index} 
                number={number} 
                key={index}
                row={props.row}
                isSelected={props.selectedBoxIndex === index}
                isHint={isHint}
            />
        );
    });

    return (
        <div className={classes.NumberRow}>
            {boxes}
        </div>
    );
}

export default NumberRow;