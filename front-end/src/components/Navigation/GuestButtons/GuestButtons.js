import { Fragment } from 'react';
import classes from './GuestButtons.module.css';

const GuestButtons = () => {
    return (
        <Fragment>
            <button className={classes.NavButton}>Register</button>
            <button className={classes.NavButton}>Login</button>
        </Fragment>
    );
}

export default GuestButtons;