import classes from './NumberRow.module.css';

import NumberBox from '../NumberBox/NumberBox';

const NumberRow = (props) => {
    const boxes = [];
    props.numbers.forEach((number, index) => {
        boxes.push(
            <NumberBox 
                selectBox={props.selectBox} 
                index={index} 
                number={number} 
                key={index}
                row={props.row}
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