import React, { createContext, useEffect, useState } from "react";
import parseCookies from "nookies";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const isAuthenticated = !!userID;
  const navigate = useNavigate();

  useEffect(() => {
    const { "access_token": accessToken } = parseCookies();

    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      setUserID(decodedToken.id);
      setToken(accessToken);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ userID, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
}