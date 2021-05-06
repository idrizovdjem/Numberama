import axios from '../axios';

async function login(email, password) {
    const rawResponse = await axios.post('/users/login', { email, password });
    const response = rawResponse.data; 
    if(response.successfull) {
        const { accessToken, refreshToken } = response.data;
        persistUser(accessToken, refreshToken);
    }

    return response;
}

async function register(email, username, password) {
    const rawResponse = await axios.post('/users/register', { email, username, password });
    const response = rawResponse.data;
    if(response.successfull) {
        const { accessToken, refreshToken } = response.data;
        persistUser(accessToken, refreshToken);
    }

    return response;
}

function isUserAuthenticated() {
    const accessToken = sessionStorage.getItem('accessToken');
    return Boolean(accessToken);
}

function logout() {
    sessionStorage.clear();
}

function persistUser(accessToken, refreshToken) {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
}

async function refreshSession() {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if(!accessToken || !refreshToken) {
        sessionStorage.clear();
        return false;
    }

    const rawResponse = await axios.post('/token/refresh', { refreshToken });
    const response = rawResponse.data;

    if(response.successfull === false) {
        sessionStorage.clear();
        return false;
    }

    persistUser(response.data.accessToken, response.data.refreshToken);
    return true;
}

const authService = {
    login,
    logout,
    register,
    refreshSession,
    isUserAuthenticated
};

export default authService;