import classes from './Register.module.css';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Register = () => {
    return (
        <form className={classes.Form} noValidate autoComplete="off">
            <Typography variant='h4'>Register</Typography>

            <TextField
                type='email'
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                required
                margin="normal"
            />

            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                size="small"
                required
                margin="normal"
            />

            <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                required
                margin="normal"
            />

            <Button variant="contained" color="primary">
                Login
            </Button>

        </form>
    );
}

export default Register;