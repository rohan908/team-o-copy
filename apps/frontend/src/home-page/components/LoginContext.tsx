import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LoginContextType = {
    isLoggedIn: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);


export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        const storedPass = localStorage.getItem('password');
        if (storedUser === 'admin' && storedPass === 'admin') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (username: string, password: string) => {
        const valid = username === 'admin' && password === 'admin';
        if (valid) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            setIsLoggedIn(true);
        }
        return valid;
    };

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setIsLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = (): LoginContextType => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};
