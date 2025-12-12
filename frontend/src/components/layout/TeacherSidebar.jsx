import React from "react";
import { useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import {
  Squares2X2Icon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function TeacherSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 flex-shrink-0 flex-col bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex fixed top-[65px] bottom-0 left-0 overflow-y-auto z-40">
      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarLink
          icon={<Squares2X2Icon className="h-6 w-6" />}
          label="Bảng điều khiển"
          active={currentPath === "/teacher/dashboard"}
          to="/teacher/dashboard"
        />
        <SidebarLink
          icon={<AcademicCapIcon className="h-6 w-6" />}
          label="Quản lý khóa học"
          active={currentPath.startsWith("/teacher/courses")}
          to="/teacher/courses"
        />
        <SidebarLink
          icon={<UserGroupIcon className="h-6 w-6" />}
          label="Quản lý học viên"
          active={currentPath === "/teacher/students"}
          to="/teacher/students"
        />
        <SidebarLink
          icon={<ChartBarIcon className="h-6 w-6" />}
          label="Báo cáo/Thống kê"
          active={currentPath === "/teacher/reports"}
          to="/teacher/reports"
        />
        <SidebarLink
          icon={<Cog6ToothIcon className="h-6 w-6" />}
          label="Cài đặt hệ thống"
          active={currentPath === "/teacher/settings"}
          to="/teacher/settings"
        />
      </nav>
    </aside>
  );
}
