import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={classes.SpinnerContainer}>
            <div className={classes.Spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Spinner;