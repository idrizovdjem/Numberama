import { useState } from 'react';
import classes from './Register.module.css';

import authValidator from '../../validators/authValidator';
import authService from '../../services/authService';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Spinner from '../Shared/Spinner/Spinner';
import AlertMessage from '../Shared/AlertMessage/AlertMessage';

const Register = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alerts, setAlerts] = useState([]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const errors = authValidator.validateRegisterInformation(email, username, password, repeatPassword);
        setAlerts(errors);
        setIsLoading(true);

        if (errors.length !== 0) {
            setIsLoading(false);
            return;
        }

        const registerResponse = await authService.register(email, username, password);
        setIsLoading(false);

        if (!registerResponse.successfull) {
            setAlerts(registerResponse.errorMessages);
            return;
        }

        if (registerResponse.successfull === false) {
            setAlerts(registerResponse.errorMessages);
            return;
        }

        props.changeAuthenticationState(true);
        props.history.push('/game');
    }

    const spinner = isLoading ? <Spinner /> : null;

    const alertElements = alerts.map((alert, index) => {
        return <AlertMessage severity='error' message={alert} key={index} />
    });

    return (
        <form onSubmit={onSubmitHandler} className={classes.Form} noValidate autoComplete="off">
            {spinner}
            <Typography variant='h4'>Register</Typography>
            {alertElements}

            <TextField
                onChange={(event) => setEmail(event.target.value)}
                type='email'
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                required
                margin="normal"
            />

            <TextField
                onChange={(event) => setUsername(event.target.value)}
                label="Username"
                variant="outlined"
                fullWidth
                size="small"
                required
                margin="normal"
            />

            <TextField
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                required
                margin="normal"
            />

            <TextField
                onChange={(event) => setRepeatPassword(event.target.value)}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                required
                margin="normal"
            />

            <Button type='submit' variant="contained" color="primary">
                Login
            </Button>

        </form>
    );
}

export default Register;