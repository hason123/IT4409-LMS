import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../common/Avatar";
import ConfirmModal from "../common/ConfirmModal";
import {
  MagnifyingGlassIcon,
  BellIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function TeacherHeader({ toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Dummy notifications - reuse from Header.jsx or fetch from API
  const notifications = [
    {
      id: 1,
      title: "Bài tập mới",
      message: 'Có 5 bài tập mới cần chấm trong khóa "Python".',
      time: "1 giờ trước",
      isRead: false,
    },
    {
      id: 2,
      title: "Yêu cầu tham gia",
      message: "3 học viên mới yêu cầu tham gia khóa học.",
      time: "2 giờ trước",
      isRead: false,
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, notificationRef]);

  const handleLogoutConfirm = async () => {
    try {
      logout();
      setShowLogoutConfirm(false);
      navigate("/home");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white dark:bg-background-dark border-b border-solid border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Toggle (Optional, if we want mobile support later) */}
          <button
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            onClick={toggleSidebar}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-3 text-primary">
            <div className="size-8 text-primary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="hidden sm:block text-xl font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">
              LearnOnline
            </h2>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4 ml-8">
          {/* Search Bar */}
          <div className="relative w-full max-w-xs hidden md:block">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              className="w-full rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:border-primary focus:ring-primary focus:outline-none"
              placeholder="Tìm kiếm khóa học, học viên..."
              type="search"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 md:hidden">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 focus:outline-none"
            >
              <BellIcon className="h-6 w-6" />
              <div className="absolute top-1 right-1 flex items-center justify-center size-4 bg-red-500 text-white text-xs font-bold rounded-full">
                3
              </div>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700 animate-fade-in-scale">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Thông báo
                  </h3>
                </div>
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0 relative"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white break-words">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-words">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-xs font-medium text-center text-primary hover:text-primary/80"
                  >
                    Xem tất cả thông báo
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1 rounded-lg transition-colors"
            >
              <Avatar />
              <div className="hidden sm:flex flex-col text-left">
                <p className="text-sm font-bold text-[#111418] dark:text-white">
                  Trần Văn An
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Giáo viên
                </p>
              </div>
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
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        open={showLogoutConfirm}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất không?"
        actionName="Đăng xuất"
        color="red"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
