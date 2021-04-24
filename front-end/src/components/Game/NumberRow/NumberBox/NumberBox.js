import classes from './NumberBox.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NumberBox = (props) => {
    const selectBoxHandler = () => {
        if(props.number === 0) {
            return;
        }
        
        props.selectBox(props.row, props.index);
    }

    let backgroundColor = null;
    if(props.isHint) {
        backgroundColor = 'yellow';
    } else if(props.isSelected) {
        backgroundColor = 'lightblue';
    }
    
    return(
        <div style={{ backgroundColor: backgroundColor }} onClick={selectBoxHandler} className={classes.NumberBox}>
            {
                props.number ? 
                <div className={classes.Number}>{props.number}</div> :
                <FontAwesomeIcon icon={faTimes} className={classes.Cross} />
            }
        </div>
    );
}

export default NumberBox;