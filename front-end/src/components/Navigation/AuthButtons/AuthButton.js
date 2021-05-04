import { Fragment } from 'react';
import classes from './AuthButtons.module.css';

import authService from '../../../services/authService';

import { NavLink } from 'react-router-dom';

const AuthButtons = (props) => {
    const logout = () => {
        authService.logout();
        props.changeAuthenticationState(false);
        props.history.push('/login');
    }

    return (
        <Fragment>
            <button onClick={logout} className={classes.NavButton}>Logout</button>
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