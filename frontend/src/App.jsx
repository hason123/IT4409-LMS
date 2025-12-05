import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ProfilePage from "./pages/ProfilePage";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherCourses from "./pages/TeacherCourses";
import TeacherCourseDetail from "./pages/TeacherCourseDetail";
import ProtectedRoute from "./components/ProtectedRoute";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

export default function App() {
  return (
    //  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    //    <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<AuthPage defaultTab="login" />} />
      <Route path="/register" element={<AuthPage defaultTab="register" />} />
      <Route
        path="/courses"
        element={<ProtectedRoute element={<CoursesPage />} />}
      />
      <Route
        path="/courses/:id"
        element={<ProtectedRoute element={<CourseDetailPage />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/teacher/dashboard"
        element={<ProtectedRoute element={<TeacherDashboard />} />}
      />
      <Route
        path="/teacher/courses"
        element={<ProtectedRoute element={<TeacherCourses />} />}
      />
      <Route
        path="/teacher/courses/create"
        element={<ProtectedRoute element={<TeacherCourseDetail />} />}
      />
      <Route
        path="/teacher/courses/:id"
        element={<ProtectedRoute element={<TeacherCourseDetail />} />}
      />
    </Routes>
    //    </AuthProvider>
    //  </GoogleOAuthProvider>
  );
}
