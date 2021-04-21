function isUserAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    return Boolean(authToken);
}

const authService = {
    isUserAuthenticated
};

export default authService;