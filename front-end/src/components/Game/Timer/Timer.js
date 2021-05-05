import classes from './Timer.module.css';

const Timer = (props) => {
    const minutes = Math.floor(props.seconds / 60);
    const seconds = props.seconds - minutes * 60;

    const stringMinutes = minutes === 10 ? minutes : `0${minutes}`;
    const stringSeconds = seconds > 10 ? seconds : `0${seconds}`;

    return (
        <div className={classes.Timer}>
            {stringMinutes} : {stringSeconds}
        </div>
    );
}

export default Timer;