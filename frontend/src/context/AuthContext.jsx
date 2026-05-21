import { useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getUserProfile,
} from "../services/authServices";
import { AuthContext } from "./authContextInstance";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("hireproofToken"));

  const register = async (userData) => {
    const data = await registerUser(userData);

    localStorage.setItem("hireproofToken", data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const login = async (userData) => {
    const data = await loginUser(userData);

    localStorage.setItem("hireproofToken", data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("hireproofToken");
    setToken(null);
    setUser(null);
  };

    useEffect(() => {
    const loadUser = async () => {
        try {
        if (!token) {
            setLoading(false);
            return;
        }

        const userData = await getUserProfile();

        setUser(userData.user);
        } catch (error) {
        console.error("Session restore failed:", error);

        localStorage.removeItem("hireproofToken");
        setToken(null);
        setUser(null);
        } finally {
        setLoading(false);
        }
    };

    loadUser();
    }, [token]);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    register,
    login,
    logout,
    getUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};