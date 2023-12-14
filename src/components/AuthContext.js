// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
