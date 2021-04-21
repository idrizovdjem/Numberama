import classes from "./Navigation.module.css";

import authService from '../../services/authService';

import AuthButtons from './AuthButtons/AuthButton';
import GuestButtons from './GuestButtons/GuestButtons';

const Navigation = () => {
    let buttons = authService.isUserAuthenticated() ? <AuthButtons /> : <GuestButtons />;

    return (
        <div className={classes.Navigation}>
            <p className={classes.Logo}>Numberama</p>
            {buttons}
        </div>
    );
}

export default Navigation;