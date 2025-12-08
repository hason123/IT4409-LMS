import React, { useState, useRef, useEffect } from "react";
import Avatar from "../common/Avatar";
import ConfirmModal from "../common/ConfirmModal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Header({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const defaultMenuItems = [
    { label: "Khóa học", path: "/courses" },
    { label: "Lộ trình học", path: "#" },
    { label: "Giới thiệu", path: "/home" },
    { label: "Liên hệ", path: "#" },
  ];

  const itemsToRender = menuItems || defaultMenuItems;

  const notifications = [
    {
      id: 1,
      title: "Khóa học mới",
      message: 'Khóa học "ReactJS Nâng Cao" vừa được xuất bản.',
      time: "2 giờ trước",
      isRead: false,
    },
    {
      id: 2,
      title: "Nhắc nhở học tập",
      message: "Bạn chưa hoàn thành bài tập của ngày hôm nay.",
      time: "5 giờ trước",
      isRead: false,
    },
    {
      id: 3,
      title: "Cập nhật hệ thống",
      message: "Hệ thống sẽ bảo trì vào lúc 00:00 ngày mai.",
      time: "1 ngày trước",
      isRead: true,
    },
  ];

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
              {itemsToRender.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-sm font-medium leading-normal hover:text-primary bg-transparent ${
                    isActive(item.path) && item.path !== "#"
                      ? "text-primary font-bold"
                      : "text-[#111418] dark:text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
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
              <>
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="text-[#111418] dark:text-white hover:text-primary transition-colors relative p-1 focus:outline-none"
                  >
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
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
              </>
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
