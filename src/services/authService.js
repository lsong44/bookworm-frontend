import { GoogleLogin, googleLogout } from '@react-oauth/google';

export const authService = {
    login,
    logout,
    isAuthenticated
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
