import { createContext, useState, useEffect } from 'react';
import { loginRequest, logoutRequest } from '../services/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // could be { email, role, token }
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    const token = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(token);
    }
  }, []);

  const login = async (userData) => {
    await loginRequest(userData.email, userData.password);
    setUser(JSON.parse(localStorage.getItem('auth')));
    setToken(localStorage.getItem('token'));
  };

  const logout = async () => {
    await logoutRequest();
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
