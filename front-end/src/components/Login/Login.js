import classes from './Login.module.css';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login = () => {
    return (
        <form className={classes.Form} noValidate autoComplete="off">
            <Typography variant='h4'>Login</Typography>

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

export default Login;