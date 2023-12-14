// src/context/AuthContextProvider.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [theme, setTheme ] = useState('claro');
  const [ letterSize, setLetterSize ] = useState(20);

  const loogin = (data) => {
    console.log('Datos recibidos en login:', data);

    // Asegúrate de que data contiene la estructura esperada antes de asignarla
    if (data) {
    //   setUserInfo(data.userInfo);
    //   setJwtToken(data.jwtToken);
    } else {
      console.error('La estructura de datos recibida en login no es la esperada.');
    }
  };

  const logout = () => {
    setUserInfo(null);
    setJwtToken(null);
  };

  const changeTheme = (data) =>{
    console.log("Cambiando a "+ data);
  }

  const changeSize = (data) =>{
    console.log(data);
  }

  return (
    <AuthContext.Provider value={{ userInfo, jwtToken, letterSize, theme, loogin, logout, changeTheme, changeSize }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
