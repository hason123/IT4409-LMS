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
      // Redirect user to their dashboard based on role
      const roleRedirects = {
        'STUDENT': '/home',
        'TEACHER': '/teacher/dashboard',
        'ADMIN': '/admin/dashboard'
      };
      const redirectPath = roleRedirects[user.role] || '/home';
      
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-light dark:bg-background-dark">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
              Truy cập bị từ chối
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Bạn không có quyền truy cập trang này.
            </p>
            <Navigate to={redirectPath} replace />
          </div>
        </div>
      );
    }
  }

  // Nếu đã đăng nhập thì hiển thị component
  return element;
}
