import classes from './SideBar.module.css';

import Button from '@material-ui/core/Button';

const SideBar = (props) => {
    return (
        <div className={classes.SideBar}>
            <p className={classes.Score}>Score: {props.score}</p>
            <div className={classes.ButtonRow}>
                <Button 
                    onClick={props.submit} 
                    variant="contained"
                    color="primary"
                >
                    Submit Score
                </Button>
            </div>

            <Button 
                onClick={props.setup} 
                variant="contained" 
                color="primary"
            >
                Reset
            </Button>
        </div>
    );
}

export default SideBar;