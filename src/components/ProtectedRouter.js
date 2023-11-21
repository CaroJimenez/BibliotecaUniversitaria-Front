import React from 'react';
import { useNavigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, ...props }) => {
  // Aquí deberías implementar tu lógica de autenticación
  // Por ejemplo, verifica si hay una sesión activa
  const isAuthenticated = /* tu lógica de autenticación aquí */ true;
  
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Si no hay sesión, redirige al usuario a la página de inicio de sesión
    navigate('/');
    return null;
  }

  // Si hay sesión, permite el acceso a la ruta protegida
  return <Route {...props} element={element} />;
};

export default ProtectedRoute;
