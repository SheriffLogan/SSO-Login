import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const isAuthenticated = () => {
  const token = secureLocalStorage.getItem('accessToken');
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;

};

export default ProtectedRoute;