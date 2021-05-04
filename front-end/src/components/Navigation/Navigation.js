import classes from "./Navigation.module.css";
import { useHistory } from 'react-router-dom';

import AuthButtons from './AuthButtons/AuthButton';
import GuestButtons from './GuestButtons/GuestButtons';

const Navigation = (props) => {
    const history = useHistory();

    let buttons = props.isUserAuthenticated ? <AuthButtons history={history} changeAuthenticationState={props.changeAuthenticationState} /> : <GuestButtons />;

    return (
        <div className={classes.Navigation}>
            <p className={classes.Logo}>Numberama</p>
            {buttons}
        </div>
    );
}

export default Navigation;