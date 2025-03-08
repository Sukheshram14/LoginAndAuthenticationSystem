import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Corrected state declaration

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("User not authenticated");
      }

      const userData = await response.json();
      setUser(userData.user);
    } catch (error) {
      console.log(error.message);
      logout();
    } finally {
      setLoading(false); // ✅ This will now work properly
    }
  };

  const login = (token) => {
    localStorage.setItem("authToken", token);
    fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
