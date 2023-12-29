import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const pageLogin = "http://localhost:3000/";
  const pageCadastro = "http://localhost:3000/cadastro";
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const url = window.location.href;
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setUserID(decodedToken.id);
        setToken(accessToken);
        setAuthenticated(true);
      } catch (error) {
        console.error("Erro desemcriptando token", error);
      }
    } else if (!authenticated && url !== pageLogin && url !== pageCadastro) {
      window.location.href = "http://localhost:3000/";
    }
  }, [authenticated]);
  return (
    <AuthContext.Provider value={{ userID, token }}>
      {children}
    </AuthContext.Provider>
  );
}
