import { Fragment, useState } from 'react';
import classes from './GuestButtons.module.css';

import { NavLink } from 'react-router-dom';

const GuestButtons = (props) => {
    const [showMobileButtons, setShowMobileButtons] = useState(false);

    const toggleMobileButtons = () => {
        setShowMobileButtons(oldState => !oldState);
        props.showMobileButtons(oldState => !oldState);
    }

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

            <button className={classes.NavButton}>
                <NavLink className={classes.Link} to='/rankings'>
                    Ranking
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
                            <NavLink className={classes.Link} to='/rankings'>
                                Ranking
                            </NavLink>
                        </button>

                        <button className={classes.MobileNavButton}>
                            <NavLink className={classes.Link} to='/login'>
                                Login
                            </NavLink>
                        </button>

                        <button className={classes.MobileNavButton}>
                            <NavLink className={classes.Link} to='/register'>
                                Register
                            </NavLink>
                        </button>
                    </div> : null
            }
        </Fragment>
    );
}

export default GuestButtons;