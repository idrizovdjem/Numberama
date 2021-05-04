import axios from '../axios';

async function login(email, password) {
    const rawResponse = await axios.post('/users/login', { email, password });
    const response = rawResponse.data; 
    if(response.successfull) {
        const { accessToken, refreshToken } = response.data;
        persistUser(accessToken, refreshToken);
    }

    return response.data;
}

async function register(email, username, password) {
    const rawResponse = await axios.post('/users/register', { email, username, password });
    const response = rawResponse.data;
    if(response.successfull) {
        const { accessToken, refreshToken } = response.data;
        persistUser(accessToken, refreshToken);
    }

    return response.data;
}

function isUserAuthenticated() {
    const authToken = sessionStorage.getItem('accessToken');
    return Boolean(authToken);
}

function logout() {
    sessionStorage.clear();
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
    logout,
    register,
    refreshSession,
    isUserAuthenticated
};

export default authService;