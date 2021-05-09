import { Fragment, useState } from 'react';
import classes from './AuthButtons.module.css';

import authService from '../../../services/authService';

import { NavLink } from 'react-router-dom';

const AuthButtons = (props) => {
    const [showMobileButtons, setShowMobileButtons] = useState(false);

    const logout = () => {
        authService.logout();
        props.changeAuthenticationState(false);
        props.history.push('/login');
        props.showMobileButtons(false);
        setShowMobileButtons(false);
    }

    const toggleMobileButtons = () => {
        setShowMobileButtons(oldState => !oldState);
        props.showMobileButtons(oldState => !oldState);
    }

    return (
        <Fragment>
            <button onClick={logout} className={classes.NavButton}>Logout</button>
            <button className={classes.NavButton}>
                <NavLink to='/rankings' exact className={classes.Link}>
                    Ranking
                </NavLink>
            </button>
            <button className={classes.NavButton}>
                <NavLink to='/game' exact className={classes.Link}>
                    Game
                </NavLink>
            </button>

            <div onClick={toggleMobileButtons} className={classes.Burger}>
                <div className={classes.Slice}></div>
                <div className={classes.Slice}></div>
                <div className={classes.Slice}></div>
            </div>

            {
                showMobileButtons ?
                    <div className={classes.MobileButtons}>
                        <button className={classes.MobileNavButton}>
                            <NavLink to='/rankings' exact className={classes.Link}>
                                Ranking
                    </NavLink>
                        </button>
                        <button className={classes.MobileNavButton}>
                            <NavLink to='/game' exact className={classes.Link}>
                                Game
                    </NavLink>
                        </button>
                        <button onClick={logout} className={classes.MobileNavButton}>Logout</button>
                    </div> : null
            }
        </Fragment>
    );
}

export default AuthButtons;