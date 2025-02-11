import { GoogleLogin, googleLogout } from '@react-oauth/google';

export const authService = {
    login,
    logout,
    isAuthenticated,
    parseToken,
}

function login(response) {
    const accessToken = response.credential;
    localStorage.setItem('token', accessToken);
}


function logout() {
    googleLogout();
    localStorage.removeItem('token');
}

function isAuthenticated() {
    return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
}

function parseToken(token) {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
}