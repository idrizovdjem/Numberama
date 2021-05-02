import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Register.module.css';

import authValidator from '../../validators/authValidator';
import authService from '../../services/authService';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AlertMessage from '../Shared/AlertMessage/AlertMessage';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alerts, setAlerts] = useState([]);

    const submitHandler = async (event) => {
        event.preventDefault();

        const errors = authValidator.validateRegisterInformation(email, username, password, repeatPassword);
        setAlerts(errors);

        if(errors.length !== 0) {
            return;
        }

        const registerResponse = await authService.register(email, username, password);
        if(!registerResponse.successfull) {
            setAlerts([...registerResponse.errorMessages]);
            return;
        }

        if(registerResponse.successfull === false) {
            setAlerts(registerResponse.errorMessages);
            return;
        }

        props.history.push('/game');
    }

    return (
        <form onSubmit={submitHandler} className={classes.Form} noValidate autoComplete="off">
            <Typography variant='h4'>Register</Typography>

            {
                alerts.map((alert, index) => {
                    return <AlertMessage severity='error' message={alert} key={index} />
                })
            }

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