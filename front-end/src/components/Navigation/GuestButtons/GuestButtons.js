import { Fragment } from 'react';
import classes from './GuestButtons.module.css';

import { NavLink } from 'react-router-dom';

const GuestButtons = () => {
    return (
        <Fragment>
            <button className={classes.NavButton}>
                <NavLink className={classes.Link} to='/register'>
                    Register
                </NavLink>
            </button>
            
            <button className={classes.NavButton}>
                <NavLink className={classes.Link} to='/login'>
                    Login
                </NavLink>
            </button>
        </Fragment>
    );
}

export default GuestButtons;