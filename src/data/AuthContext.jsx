// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');
        if (storedLogin) {
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, [])
    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    }
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
