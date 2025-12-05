import React, { useState, useRef, useEffect } from "react";
import Avatar from "../Avatar";
import ConfirmModal from "./ConfirmModal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      logout();
      setShowLogoutConfirm(false);
      navigate("/home");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <>
      <header className="sticky top-0 z-50 flex justify-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-solid border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-3 w-full max-w-7xl">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-primary text-3xl">
                school
              </span>
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">
                LearnOnline
              </h2>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              <button
                type="button"
                className={`text-sm font-medium leading-normal hover:text-primary bg-transparent ${
                  isActive("/courses")
                    ? "text-primary font-bold"
                    : "text-[#111418] dark:text-white/90"
                }`}
                onClick={() => navigate("/courses")}
              >
                Khóa học
              </button>
              <Link
                className="text-sm font-medium leading-normal text-[#111418] dark:text-white/90 hover:text-primary"
                to="#"
              >
                Lộ trình học
              </Link>
              <button
                type="button"
                className={`text-sm font-medium leading-normal hover:text-primary bg-transparent ${
                  isActive("/home")
                    ? "text-primary font-bold"
                    : "text-[#111418] dark:text-white/90"
                }`}
                onClick={() => navigate("/home")}
              >
                Giới thiệu
              </button>
              <Link
                className="text-sm font-medium leading-normal text-[#111418] dark:text-white/90 hover:text-primary"
                to="#"
              >
                Liên hệ
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end gap-2 sm:gap-4 items-center">
            <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full items-stretch rounded-lg">
                <div className="text-[#617589] flex border border-r-0 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 items-center justify-center pl-3.5 pr-3.5 rounded-l-lg h-10">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1"
                  style={{ height: "40px" }}
                  placeholder="Tìm kiếm..."
                />
              </div>
            </label>
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <Avatar />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700 animate-fade-in-scale">
                    <Link
                      to="/profile"
                      state={{ activeTab: "profile" }}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Hồ sơ
                    </Link>
                    <Link
                      to="/profile"
                      state={{ activeTab: "settings" }}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Cài đặt
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-[#111418] dark:text-white text-sm font-bold transition-colors duration-150 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-colors duration-150 hover:bg-primary/90"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal Xác nhận Đăng xuất */}
      <ConfirmModal
        open={showLogoutConfirm}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất không?"
        actionName="Đăng xuất"
        color="red"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        isLoading={isLoggingOut}
      />
      <ConfirmModal
        open={showLogoutConfirm}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?"
        actionName="Đăng xuất"
        color="red"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        isLoading={isLoggingOut}
      />
    </>
  );
}
