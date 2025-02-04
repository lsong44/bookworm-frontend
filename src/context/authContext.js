import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setIsAuthenticated(authService.isAuthenticated());
        setToken(localStorage.getItem('token'));
    }, []);

    const login = (response) => {
        authService.login(response);
        setIsAuthenticated(true);
        setToken(localStorage.getItem('token'));
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}