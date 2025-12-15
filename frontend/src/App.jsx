import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/auth/AuthPage";
import Home from "./pages/student/Home";
import CoursesPage from "./pages/common/CoursesPage";
import CourseDetailPage from "./pages/common/CourseDetailPage";
import QuizAttempt from "./pages/student/QuizAttempt";
import QuizResult from "./pages/student/QuizResult";
import ProfilePage from "./pages/student/ProfilePage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import CreateCourse from "./pages/teacher/CreateCourse";
import LectureDetail from "./pages/teacher/LectureDetail";
import QuizDetail from "./pages/teacher/QuizDetail";
import TeacherProfilePage from "./pages/teacher/TeacherProfilePage";
import TeacherSettingsPage from "./pages/teacher/TeacherSettingsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE";

function RootRedirect() {
  const { user, isLoggedIn, loading } = useAuth();
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (user?.role === 'TEACHER') {
    return <Navigate to="/teacher/dashboard" replace />;
  }
  
  if (user?.role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  // Default for STUDENT and others
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
            element={<ProtectedRoute element={<Home />} allowedRoles={['STUDENT']} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} allowedRoles={['STUDENT']} />}
          />
          <Route
            path="/quizzes/:id/attempt"
            element={<ProtectedRoute element={<QuizAttempt />} allowedRoles={['STUDENT']} />}
          />
          <Route
            path="/quizzes/:id/result"
            element={<ProtectedRoute element={<QuizResult />} allowedRoles={['STUDENT']} />}
          />

          {/* Public/Auth Routes */}
          <Route path="/login" element={<AuthPage defaultTab="login" />} />
          <Route path="/register" element={<AuthPage defaultTab="register" />} />

          {/* Common Routes (Student, Teacher, Admin) */}
          <Route
            path="/courses"
            element={<ProtectedRoute element={<CoursesPage />} allowedRoles={['STUDENT', 'TEACHER', 'ADMIN']} />}
          />
          <Route
            path="/courses/:id"
            element={<ProtectedRoute element={<CourseDetailPage />} allowedRoles={['STUDENT', 'TEACHER', 'ADMIN']} />}
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
            element={<ProtectedRoute element={<CreateCourse />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses/edit/:id"
            element={<ProtectedRoute element={<CreateCourse />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses/:courseId/lectures/create"
            element={<ProtectedRoute element={<LectureDetail />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses/:courseId/lectures/:lectureId"
            element={<ProtectedRoute element={<LectureDetail />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses/:courseId/quizzes/create"
            element={<ProtectedRoute element={<QuizDetail />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/courses/:courseId/quizzes/:quizId"
            element={<ProtectedRoute element={<QuizDetail />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/profile"
            element={<ProtectedRoute element={<TeacherProfilePage />} allowedRoles={['TEACHER']} />}
          />
          <Route
            path="/teacher/settings"
            element={<ProtectedRoute element={<TeacherSettingsPage />} allowedRoles={['TEACHER']} />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['ADMIN']} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute element={<AdminUserManagement />} allowedRoles={['ADMIN']} />}
          />
          <Route
            path="/admin/profile"
            element={<ProtectedRoute element={<AdminProfilePage />} allowedRoles={['ADMIN']} />}
          />
          <Route
            path="/admin/settings"
            element={<ProtectedRoute element={<AdminSettingsPage />} allowedRoles={['ADMIN']} />}
          />
        </Routes>
       </AuthProvider>
     </GoogleOAuthProvider>
  );
}
