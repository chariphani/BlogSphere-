import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("blogsphere_token");
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("blogsphere_token");
      })
      .finally(() => setLoading(false));
  }, []);
  const login = async (data) => {
    const result = await loginUser(data);
    localStorage.setItem("blogsphere_token", result.token);
    setUser(result.user);
    return result.user;
  };
  const register = async (data) => {
    const result = await registerUser(data);
    localStorage.setItem("blogsphere_token", result.token);
    setUser(result.user);
    return result.user;
  };
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("blogsphere_token");
      setUser(null);
    }
  };
  const value = { user, loading, login, register, logout, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
