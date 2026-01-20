import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:3001/api/auth';

    // Check auth status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/check`, {
                withCredentials: true
            });
            if (response.data.authenticated) {
                setHospital(response.data.hospital);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, 
            { email, password },
            { withCredentials: true }
        );
        setHospital(response.data.hospital);
        return response.data;
    };

    const signup = async (hospitalData) => {
        const response = await axios.post(`${API_URL}/signup`, hospitalData);
        return response.data;
    };

    const logout = async () => {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        setHospital(null);
    };

    const value = {
        hospital,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!hospital
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
