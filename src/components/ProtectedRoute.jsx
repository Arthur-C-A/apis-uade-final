import React from 'react';
import { isAdmin } from '../services/auth';
import AccessDenied from './AccessDenied';

const ProtectedRoute = ({ children }) => {
  if (!isAdmin()) {
    return <AccessDenied />;
  }
  return children;
};

export default ProtectedRoute; 