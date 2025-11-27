import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ element }) {
  const { isLoggedIn } = useAuth();

  // Nếu chưa đăng nhập thì redirect về /login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập thì hiển thị component
  return element;
}
