import classes from './SideBar.module.css';

const SideBar = (props) => {
    return (
        <div className={classes.SideBar}>
            <p className={classes.Score}>Score: {props.score}</p>
        </div>
    );
}

export default SideBar;