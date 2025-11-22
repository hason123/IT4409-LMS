import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage defaultTab="login" />} />
      <Route path="/register" element={<AuthPage defaultTab="register" />} />
      <Route path='/courses' element={<CoursesPage />} />
      <Route path='/courses/:id' element={<CourseDetailPage />} />
    </Routes>
  )
}
