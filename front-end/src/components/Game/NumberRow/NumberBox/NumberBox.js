import classes from './NumberBox.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NumberBox = (props) => {
    const selectBoxHandler = () => {
        // check if the clicked number box value is different than 0 and if it is select the box
        if(props.number === 0) {
            return;
        }
        
        props.selectBox(props.row, props.index);
    }

    let backgroundColor = props.isHint ? 'yellow' : 'lightblue';
    
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