import { useState } from 'react';
import classes from './Login.module.css';

import authValidator from '../../validators/authValidator';
import authService from '../../services/authService';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AlertMessage from '../Shared/AlertMessage/AlertMessage';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);

    const submitHandler = async (event) => {
        event.preventDefault();

        const errors = authValidator.validateLoginInforation(email, password);
        setAlerts(errors);

        if(errors.length !== 0) {
            return;
        }

        const loginResponse = await authService.login(email, password);

        if(loginResponse.successfull === false) {
            setAlerts(loginResponse.errorMessages);
            return;
        }

        props.changeAuthenticationState(true);
        props.history.push('/game');
    }

    return (
        <form onSubmit={submitHandler} className={classes.Form} noValidate autoComplete="off">
            <Typography variant='h4'>Login</Typography>

            {
                alerts.map((alert, index) => {
                    return <AlertMessage severity='error' message={alert} key={index} />
                })
            }

            <TextField
                onChange={(event) => setEmail(event.target.value)}
                label="Email"
                type='email'
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

            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </form>
    );
}

export default Login;