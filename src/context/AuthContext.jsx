import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getCurrentUser, postLogout } from "../api/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getCurrentUser();
      const userData = res.data?.user || null;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback((token, userData = null) => {
    localStorage.setItem("token", token);
    if (userData) {
      setUser(userData);
      setLoading(false);
    } else {
      fetchUser();
    }
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await postLogout();
    } catch (err) {
      console.warn("Logout request failed, clearing local session anyway.", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/login";
    }
  }, []);

  const updateUser = useCallback((updatedFields) => {
    setUser((prev) => {
      if (typeof updatedFields === "function") {
        return updatedFields(prev);
      }
      return prev ? { ...prev, ...updatedFields } : updatedFields;
    });
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    getToken,
    login,
    logout,
    updateUser,
    fetchUser,
    isAuthenticated: Boolean(user && getToken()),
  }),
    [user, loading, getToken, login, logout, updateUser, fetchUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}