import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập lúc app khởi tạo
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      // Có thể verify token với backend ở đây nếu cần
    }
    setLoading(false);
  }, []);

  // Hàm logout
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  // Hàm login
  const loginUser = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, loginUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}
