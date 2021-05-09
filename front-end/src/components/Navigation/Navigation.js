import classes from './Navigation.module.css';
import { useHistory } from 'react-router-dom';

import AuthButtons from './AuthButtons/AuthButton';
import GuestButtons from './GuestButtons/GuestButtons';


const Navigation = (props) => {
    const history = useHistory();

    let buttons = props.isUserAuthenticated ? 
        <AuthButtons 
            history={history} 
            changeAuthenticationState={props.changeAuthenticationState} 
            showMobileButtons={props.setMobileButtonsVisible}
            /> 
        : <GuestButtons showMobileButtons={props.setMobileButtonsVisible} />;

    const navHeight = props.mobileButtonsVisible ? '24vh' : '6vh';

    return (
        <div style={{ height: navHeight }} className={classes.Navigation}>
            <div className={classes.Logo}>Numberama</div>
            {buttons}
        </div>
    );
}

export default Navigation;