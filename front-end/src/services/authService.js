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

function shouldRefresh() {
    // get the last refreshed time
    let lastRefreshed = parseInt(sessionStorage.getItem('lastRefreshed'));
    // get current time and calculate the difference in minutes
    const now = Date.now();
    const minutesDiff = (now - lastRefreshed) / 1000 / 60;

    // if the difference is less than 20 minutes, that means new game can be played without refreshing the session token(every game is 10 minutes and token life time is 30 minutes)
    return minutesDiff > 19;
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
    sessionStorage.setItem('lastRefreshed', Date.now());
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
    shouldRefresh,
    refreshSession,
    isUserAuthenticated
};

export default authService;