import { useState } from 'react';
import classes from './Login.module.css';

import authValidator from '../../validators/authValidator';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AlertMessage from '../Shared/AlertMessage/AlertMessage';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);

    const submitHandler = (event) => {
        event.preventDefault();

        const errors = authValidator.validateLoginInforation(username, password);
        console.log(errors);
        setAlerts(errors);
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

            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </form>
    );
}

export default Login;