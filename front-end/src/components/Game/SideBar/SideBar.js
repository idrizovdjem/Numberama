import classes from './SideBar.module.css';

import Button from '@material-ui/core/Button';

const SideBar = (props) => {
    return (
        <div className={classes.SideBar}>
            <p className={classes.Score}>Score: {props.score}</p>
            <Button variant="contained" color="primary">
                Submit Score
            </Button>
        </div>
    );
}

export default SideBar;