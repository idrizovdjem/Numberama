import Alert from '@material-ui/lab/Alert';

const AlertMessage = (props) => {
    return (
        <Alert severity={props.severity}>{props.message}</Alert>
    );
}

export default AlertMessage;