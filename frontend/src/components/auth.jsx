import React, { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const isAuthenticated = !!userID;

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setUserID(decodedToken.id);
        setToken(accessToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No access token found. Redirecting...");
    }
  }, []);
  console.log(userID);
  console.log(token);
  return (
    <AuthContext.Provider value={{ userID, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
}