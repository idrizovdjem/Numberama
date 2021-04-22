import { Fragment } from 'react';
import classes from './AuthButtons.module.css';

import { NavLink } from 'react-router-dom';

const AuthButtons = () => {
    return (
        <Fragment>
            <button className={classes.NavButton}>Logout</button>
            <button className={classes.NavButton}>
                <NavLink to='/ranking' exact className={classes.Link}>
                    Ranking
                </NavLink>
            </button>
            <button className={classes.NavButton}>
                <NavLink to='/game' exact className={classes.Link}>
                    Game
                </NavLink>
            </button>
        </Fragment>
    );
}

export default AuthButtons;