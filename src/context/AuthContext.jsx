import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE = 'https://ajantaworld.in/api/user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('ajanta_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const register = async ({ name, email, mobile, password, cpassword }) => {
    const res = await axios.post(`${API_BASE}/registercustomer`, {
      name, email, mobile, password, cpassword
    });
    if (res.data.error) throw new Error(res.data.error);
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await axios.post(`${API_BASE}/logincustomer`, { email, password });
    if (res.data.error) throw new Error(res.data.error);
    const userData = res.data.success;
    setUser(userData);
    localStorage.setItem('ajanta_user', JSON.stringify(userData));
    localStorage.setItem('ajanta_customer_email', userData.email);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ajanta_user');
  };

  const updateUser = (updatedData) => {
    const merged = { ...user, ...updatedData };
    setUser(merged);
    localStorage.setItem('ajanta_user', JSON.stringify(merged));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
