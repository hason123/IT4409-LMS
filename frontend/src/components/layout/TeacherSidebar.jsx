import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import {
  Squares2X2Icon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export default function TeacherSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`flex flex-shrink-0 flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-slate-700 fixed top-[65px] bottom-0 left-0 overflow-y-auto z-40 transition-all duration-300 ${
      isCollapsed ? "w-20" : "w-64"
    }`}>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarLink
          icon={<Squares2X2Icon className="h-6 w-6" />}
          label="Tổng quan"
          active={currentPath === "/teacher/dashboard"}
          to="/teacher/dashboard"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          icon={<AcademicCapIcon className="h-6 w-6" />}
          label="Quản lý khóa học"
          active={currentPath.startsWith("/teacher/courses")}
          to="/teacher/courses"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          icon={<UserGroupIcon className="h-6 w-6" />}
          label="Quản lý học viên"
          active={currentPath === "/teacher/students"}
          to="/teacher/students"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          icon={<ChartBarIcon className="h-6 w-6" />}
          label="Báo cáo/Thống kê"
          active={currentPath === "/teacher/report"}
          to="/teacher/report"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          icon={<BellIcon className="h-6 w-6" />}
          label="Thông báo"
          active={currentPath === "/notifications"}
          to="/notifications"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          icon={<UserGroupIcon className="h-6 w-6" />}
          label="Hồ sơ cá nhân"
          active={currentPath === "/teacher/profile"}
          to="/teacher/profile"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          icon={<Cog6ToothIcon className="h-6 w-6" />}
          label="Cài đặt hệ thống"
          active={currentPath === "/teacher/settings"}
          to="/teacher/settings"
          isCollapsed={isCollapsed}
        />
      </nav>
    </aside>
  );
}
