import classes from './NumberRow.module.css';

import NumberBox from '../NumberBox/NumberBox';

const NumberRow = (props) => {
    const boxes = [];
    props.numbers.forEach((number, index) => {
        boxes.push(<NumberBox number={number} key={index} />)
    });

    return (
        <div className={classes.NumberRow}>
            {boxes}
        </div>
    );
}

export default NumberRow;