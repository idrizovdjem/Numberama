import classes from "./Navigation.module.css";

import AuthButtons from './AuthButtons/AuthButton';
import GuestButtons from './GuestButtons/GuestButtons';

const Navigation = () => {

    return (
        <div className={classes.Navigation}>
            <p className={classes.Logo}>Numberama</p>
        </div>
    );
}

export default Navigation;