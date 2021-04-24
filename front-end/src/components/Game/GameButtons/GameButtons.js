import classes from './GameButtons.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faLightbulb, faBroom } from '@fortawesome/free-solid-svg-icons'

const GameButtons = (props) => {
    return (
        <div className={classes.GameButtonsContainer}>
            <button onClick={props.addRow} className={classes.GameButton}>
                <FontAwesomeIcon icon={faPlusCircle} className={classes.Icon} />
                Check
            </button>

            <button className={classes.GameButton} onClick={props.hint}>
                <FontAwesomeIcon icon={faLightbulb} className={classes.Icon} />
                Hint
            </button>

            <button onClick={props.clearRows} className={classes.GameButton}>
                <FontAwesomeIcon icon={faBroom} className={classes.Icon} />
                Clear
            </button>
        </div>
    );
}

export default GameButtons;