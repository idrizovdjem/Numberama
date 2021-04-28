function validateLoginInforation(email, password) {
    const errors = [];

    if(email.length < 4) {
        errors.push('Email must be at least 4 symbols!');
    }

    if(password.length < 6) {
        errors.push('Password must be at least 6 symbols!');
    }

    return errors;
}

function validateRegisterInformation(email, username, password, repeatPassword) {
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

    return errors;
}

const authValidator = {
    validateLoginInforation,
    validateRegisterInformation
};

export default authValidator;