import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  return (props) => {
    const isAuthenticated = localStorage.getItem('userId');
    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

export default withAuth;
