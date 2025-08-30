// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // 3. Check for a user session on initial app load
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        // If a token exists, we should verify it with the backend
        // For simplicity here, we'll assume the token is valid
        // In a real app, you'd make a call to a '/api/users/me' endpoint
        // For now, let's decode the token to get user info (a simple approach)
        try {
            // This is a simplified way to get user info. A backend call is more secure.
            const storedUser = JSON.parse(atob(token.split('.')[1])); 
            setUser({ ...storedUser, token }); // Set user state
        } catch (e) {
            console.error("Invalid token found", e);
            localStorage.removeItem('userToken');
        }
      }
      setLoading(false); // Finished checking
    };
    checkLoggedIn();
  }, []);

  // 4. Login function
  const login = (userData) => {
    localStorage.setItem('userToken', userData.token);
    setUser(userData);
  };

  // 5. Logout function
  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  // 6. The value provided to all consuming components
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // A handy boolean to check if user is logged in
  };

  // Don't render the app until we've checked for a user
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

// 7. A custom hook to make it easy to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};