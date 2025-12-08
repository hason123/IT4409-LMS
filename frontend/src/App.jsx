import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/auth/AuthPage";
import Home from "./pages/student/Home";
import CoursesPage from "./pages/common/CoursesPage";
import CourseDetailPage from "./pages/common/CourseDetailPage";
import ProfilePage from "./pages/student/ProfilePage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherCourseDetail from "./pages/teacher/TeacherCourseDetail";
import ProtectedRoute from "./components/common/ProtectedRoute";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

function RootRedirect() {
  const { user, isLoggedIn, loading } = useAuth();
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'TEACHER') {
    return <Navigate to="/teacher/dashboard" replace />;
  }
  
  // Default for USER (Student) and others
  return <Navigate to="/home" replace />;
}

export default function App() {
  return (
     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
       <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          
          {/* Student Routes */}
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} allowedRoles={['USER']} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} allowedRoles={['USER']} />}
          />

          {/* Public/Auth Routes */}
          <Route path="/login" element={<AuthPage defaultTab="login" />} />
          <Route path="/register" element={<AuthPage defaultTab="register" />} />

          {/* Common Routes (Student, Teacher, Admin) */}
          <Route
            path="/courses"
            element={<ProtectedRoute element={<CoursesPage />} allowedRoles={['USER', 'TEACHER', 'ADMIN']} />}
          />
          <Route
            path="/courses/:id"
            element={<ProtectedRoute element={<CourseDetailPage />} allowedRoles={['USER', 'TEACHER', 'ADMIN']} />}
          />

          {/* Teacher Routes */}
          <Route
            path="/teacher/dashboard"
            element={<ProtectedRoute element={<TeacherDashboard />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses"
            element={<ProtectedRoute element={<TeacherCourses />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses/create"
            element={<ProtectedRoute element={<TeacherCourseDetail />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses/:id"
            element={<ProtectedRoute element={<TeacherCourseDetail />} allowedRoles={['TEACHER']} />}
          />
        </Routes>
       </AuthProvider>
     </GoogleOAuthProvider>
  );
}
