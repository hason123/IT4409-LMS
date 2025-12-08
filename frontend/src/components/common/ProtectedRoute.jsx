import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ element, allowedRoles }) {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Nếu chưa đăng nhập thì redirect về /login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check role if allowedRoles is provided
  if (allowedRoles && user) {
    if (!allowedRoles.includes(user.role)) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      );
    }
  }

  // Nếu đã đăng nhập thì hiển thị component
  return element;
}
