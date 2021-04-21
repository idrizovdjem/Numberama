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

    const boxStyle = {
        backgroundColor: props.isSelected ? 'lightblue' : 'white'
    };
    
    return(
        <div style={boxStyle} onClick={selectBoxHandler} className={classes.NumberBox}>
            {
                props.number ? 
                <div className={classes.Number}>{props.number}</div> :
                <FontAwesomeIcon icon={faTimes} className={classes.Cross} />
            }
        </div>
    );
}

export default NumberBox;