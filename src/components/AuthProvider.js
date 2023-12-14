// src/context/AuthContextProvider.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  const login = (data) => {
    setUserInfo(data.userInfo);
    setJwtToken(data.jwtToken);
  };

  const logout = () => {
    setUserInfo(null);
    setJwtToken(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
