import classes from './NumberBox.module.css';

const NumberBox = (props) => {
    return(
        <div className={classes.NumberBox}>
            <div className={classes.Number}>{props.number}</div>
        </div>
    );
}

export default NumberBox;