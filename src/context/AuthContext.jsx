import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'demo-user-01',
  name: 'Bristi Mahata',
  email: 'bristi.mahata@safeher.org',
  phone: '+91 98765 43210',
  bloodGroup: 'O+',
  medicalNotes: 'Asthma inhaler in bag. No drug allergies.',
  address: 'Salt Lake, Kolkata',
  avatar: null,
  joinDate: 'August 2026',
  isDemo: true
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // On mount: try to restore session from localStorage token
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('safeher_token');
      if (token) {
        try {
          const data = await api.getMe();
          setUser(data.user);
          setIsAuthenticated(true);
        } catch {
          // Token expired or invalid — clear it
          localStorage.removeItem('safeher_token');
          // Fall back to demo user so app is still usable
          setUser(DEMO_USER);
          setIsAuthenticated(true);
        }
      } else {
        // No token: use demo user so app is functional
        setUser(DEMO_USER);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setAuthError(null);
    try {
      const data = await api.login({ email, password });
      localStorage.setItem('safeher_token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.message || 'Login failed';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  }, []);

  const loginAsDemo = useCallback(() => {
    // Try to login with demo credentials
    return login('bristi.mahata@safeher.org', 'safeher123').catch(() => {
      // If backend unavailable, use client-side demo user
      setUser(DEMO_USER);
      setIsAuthenticated(true);
      return { success: true, user: DEMO_USER };
    });
  }, [login]);

  const register = useCallback(async (userData) => {
    setAuthError(null);
    try {
      const data = await api.register(userData);
      localStorage.setItem('safeher_token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.message || 'Registration failed';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  }, []);

  const updateProfile = useCallback((updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('safeher_token');
    setUser(DEMO_USER);
    setIsAuthenticated(true); // Keep demo user active
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        authError,
        login,
        loginAsDemo,
        register,
        updateProfile,
        logout,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
