import axios from '../axios';

async function login(email, password) {
    const response = await axios.post('/users/login', { email, password });
    if(response.successfull) {
        const [accessToken, refreshToken] = response.data;
        persistUser(accessToken, refreshToken);
    }

    return response.data;
}

async function register(email, username, password) {
    const response = await axios.post('/users/register', { email, username, password });
    if(response.successfull) {
        const [accessToken, refreshToken] = response.data;
        persistUser(accessToken, refreshToken);
    }

    return response.data;
}

function isUserAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    return Boolean(authToken);
}

function persistUser(accessToken, refreshToken) {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
}

const authService = {
    login,
    register,
    isUserAuthenticated
};

export default authService;