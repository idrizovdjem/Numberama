import classes from './SideBar.module.css';

import authService from '../../../services/authService';

import Button from '@material-ui/core/Button';

const SideBar = (props) => {
    const submitScoreHandler = async () => {
        // check if the user is authenticated
        // send the score
    }

    return (
        <div className={classes.SideBar}>
            <p className={classes.Score}>Score: {props.score}</p>
            <div className={classes.ButtonRow}>
                <Button onClick={submitScoreHandler} variant="contained" color="primary">
                    Submit Score
                </Button>
            </div>

            <Button variant="contained" color="primary">
                Reset
            </Button>
        </div>
    );
}

export default SideBar;