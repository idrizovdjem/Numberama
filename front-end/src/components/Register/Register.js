import { useState } from 'react';
import classes from './Register.module.css';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AlertMessage from '../Shared/AlertMessage/AlertMessage';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alerts, setAlerts] = useState([]);

    const submitHandler = (event) => {
        event.preventDefault();

        const errors = [];

        if (email.length < 5) {
            errors.push('Invalid email!');
        }

        if (username.length < 4) {
            errors.push('Username must be at least 4 symbols long!');
        }

        if (password.length < 6) {
            errors.push('Password must be at least 6 symbols long!');
        }

        if(password !== repeatPassword) {
            errors.push('Passwords does not match!');
        }

        setAlerts(errors);
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