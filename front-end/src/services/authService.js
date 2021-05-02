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
    const authToken = localStorage.getItem('accessToken');
    return Boolean(authToken);
}

function persistUser(accessToken, refreshToken) {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
}

async function refreshSession() {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const response = await axios.post('/token/refresh', { refreshToken });
    return response.data;
}

const authService = {
    login,
    register,
    refreshSession,
    isUserAuthenticated
};

export default authService;