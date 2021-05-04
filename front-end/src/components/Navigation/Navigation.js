import classes from "./Navigation.module.css";
import { useHistory } from 'react-router-dom';

import authService from '../../services/authService';

import AuthButtons from './AuthButtons/AuthButton';
import GuestButtons from './GuestButtons/GuestButtons';

const Navigation = () => {
    const history = useHistory();

    let buttons = authService.isUserAuthenticated() ? <AuthButtons history={history} /> : <GuestButtons />;

    return (
        <div className={classes.Navigation}>
            <p className={classes.Logo}>Numberama</p>
            {buttons}
        </div>
    );
}

export default Navigation;