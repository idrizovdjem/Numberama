import { Fragment } from 'react';
import classes from './AuthButtons.module.css';

const AuthButtons = () => {
    return (
        <Fragment>
            <button className={classes.NavButton}>Logout</button>
            <button className={classes.NavButton}>Ranking</button>
            <button className={classes.NavButton}>Game</button>
        </Fragment>
    );
}

export default AuthButtons;