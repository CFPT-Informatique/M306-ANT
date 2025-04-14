import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ loggedIn, element }) => {
  return loggedIn ? <Navigate to="/home" /> : element;
};

export default PublicRoute;