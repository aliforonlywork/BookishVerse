import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('bv_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('bv_token', data.token);
    localStorage.setItem('bv_admin', JSON.stringify(data));
    setAdmin(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('bv_token');
    localStorage.removeItem('bv_admin');
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ admin, login, logout }}>{children}</AuthContext.Provider>;
}
