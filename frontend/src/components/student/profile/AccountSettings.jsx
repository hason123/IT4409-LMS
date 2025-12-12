import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { PencilIcon } from "@heroicons/react/24/solid";

export default function AccountSettings() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-black/10 dark:border-white/10">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white">
            Cài đặt hệ thống
          </p>
          <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
            Quản lý cài đặt hệ thống của bạn.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] dark:bg-gray-700 text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e0e2e5] dark:hover:bg-gray-600 transition-colors"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            <span className="truncate">Chỉnh sửa</span>
          </button>
        )}
      </div>
      <div className="py-6 flex flex-col gap-6">
        {/* Language Setting */}
        <div className="flex gap-4 items-center">
          <h3 className="text-lg font-bold text-[#111418] dark:text-white">
            Ngôn ngữ:
          </h3>
          <div className="flex flex-col min-w-40 max-w-md">
            <Select
              defaultValue="vi"
              className="w-full h-11"
              options={[
                { value: "vi", label: "Tiếng Việt" },
                { value: "en", label: "English" },
              ]}
            />
          </div>
        </div>

        {/* Dark Mode Setting */}
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-[#111418] dark:text-white">
            Giao diện:
          </h3>

          <div className="flex items-center justify-between gap-4 max-w-md p-4 border border-black/10 dark:border-white/10 rounded-lg">
            <div className="flex flex-col">
              <span className="text-base font-medium text-[#111418] dark:text-white">
                Chế độ tối
              </span>
              <span className="text-sm text-[#617589] dark:text-gray-400">
                Điều chỉnh giao diện sáng/tối.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="flex gap-4 items-center">
          <h3 className="text-lg font-bold text-[#111418] dark:text-white">
            Thông báo:
          </h3>

          <div className="flex items-center gap-4 justify-between max-w-md p-4 border border-black/10 dark:border-white/10 rounded-lg">
            <div className="flex flex-col">
              <span className="text-base font-medium text-[#111418] dark:text-white">
                Thông báo qua Email
              </span>
              <span className="text-sm text-[#617589] dark:text-gray-400">
                Nhận email về các khóa học mới và khuyến mãi.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end gap-4 pt-6 border-t border-black/10 dark:border-white/10">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center justify-center h-10 px-6 rounded-lg bg-background-light dark:bg-white/10 text-black dark:text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-black/5 dark:hover:bg-white/20 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-primary/90 transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      )}
    </>
  );
}
