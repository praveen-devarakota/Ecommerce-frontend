import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Load user and token from localStorage initially
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  // Save user and token to localStorage whenever they change
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  // Axios interceptors: attach token to requests, handle 401 errors
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, navigate]);

  // Login function accepts email & password, calls backend, sets user & token
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post('http://localhost:5001/api/users/login', { email, password });
      const { token: receivedToken, userId, username, email: userEmail } = res.data;

      setUser({ userId, username, email: userEmail });
      setToken(receivedToken);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout clears state and localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using the AuthContext easily
export function useAuth() {
  return useContext(AuthContext);
}
