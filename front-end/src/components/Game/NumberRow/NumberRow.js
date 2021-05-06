import classes from './NumberRow.module.css';

import NumberBox from './NumberBox/NumberBox';

const NumberRow = (props) => {
    const boxes = props.numbers.map((number, index) => {
        let isHint = false;

        // check if the current row contains hint box
        if(props.hintBoxes[0] !== null && props.hintBoxes[0].row === props.row && props.hintBoxes[0].col === index) {
            // there is no hint
            isHint = true;
        } else if(props.hintBoxes[1] !== null && props.hintBoxes[1].row === props.row && props.hintBoxes[1].col === index) {
            // there is hint
            isHint = true;
        }

        return (
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