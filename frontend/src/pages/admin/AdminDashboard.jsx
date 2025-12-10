import React, { useState } from "react";
import TeacherHeader from "../../components/layout/TeacherHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import {
  UserGroupIcon,
  AcademicCapIcon,
  UserPlusIcon,
  PlusCircleIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data
  const stats = [
    {
      label: "Tổng số người dùng",
      value: "10,482",
      change: "+2.5%",
      changeType: "positive",
      icon: UserGroupIcon,
    },
    {
      label: "Số khóa học đang hoạt động",
      value: "1,204",
      change: "+1.2%",
      changeType: "positive",
      icon: AcademicCapIcon,
    },
    {
      label: "Số lượng đăng ký mới",
      value: "312",
      change: "-0.5%",
      changeType: "negative",
      icon: UserPlusIcon,
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "warning",
      icon: "warning",
      title: "Bảo trì cơ sở dữ liệu",
      message: "Được lên lịch cho tối nay lúc 2 sáng. Dự kiến có thời gian ngừng hoạt động ngắn.",
    },
    {
      id: 2,
      type: "info",
      icon: "approval",
      title: "Khóa học mới đang chờ duyệt",
      message: "Xem xét và phê duyệt các bài tập khóa học mới.",
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <TeacherHeader toggleSidebar={toggleSidebar} />
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-wrap mt-3 items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bảng điều khiển
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Chào mừng quay trở lại, Quản trị viên!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                <DocumentArrowDownIcon className="h-5 w-5" />
                <span>Tạo báo cáo</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isPositive = stat.changeType === "positive";
              return (
                <div
                  key={index}
                  className="rounded-xl p-6 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className="h-8 w-8 text-primary/30" />
                  </div>
                  <p
                    className={`text-sm font-medium ${
                      isPositive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change} so với tháng trước
                  </p>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Chart Section */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800/50 lg:col-span-3">
              <p className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Tăng trưởng người dùng theo thời gian
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                10,482 Người dùng
              </p>
              <div className="flex gap-2 items-center mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  6 tháng gần đây
                </p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  +15%
                </p>
              </div>
              
              {/* Chart Placeholder */}
              <div className="flex h-64 flex-1 flex-col gap-8 py-4 items-center justify-center">
                <div className="w-full h-full">
                  <svg
                    fill="none"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="-3 0 478 150"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                      fill="url(#paint0_linear)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#137fec"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="paint0_linear"
                        x1="236"
                        x2="236"
                        y1="1"
                        y2="149"
                      >
                        <stop stopColor="#137fec" stopOpacity="0.2"></stop>
                        <stop
                          offset="1"
                          stopColor="#137fec"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Alerts Section */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800/50 lg:col-span-2">
              <p className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                Cảnh báo hệ thống
              </p>
              <div className="flex flex-col gap-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 rounded-lg p-4 ${
                      alert.type === "warning"
                        ? "bg-yellow-50 dark:bg-yellow-500/10"
                        : "bg-blue-50 dark:bg-blue-500/10"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${
                        alert.type === "warning"
                          ? "text-yellow-500 dark:text-yellow-400"
                          : "text-blue-500 dark:text-blue-400"
                      }`}
                      style={{ marginTop: "2px" }}
                    >
                      {alert.icon}
                    </span>
                    <div className="flex flex-col flex-1">
                      <p
                        className={`text-sm font-medium ${
                          alert.type === "warning"
                            ? "text-yellow-800 dark:text-yellow-300"
                            : "text-blue-800 dark:text-blue-300"
                        }`}
                      >
                        {alert.title}
                      </p>
                      <p
                        className={`text-sm ${
                          alert.type === "warning"
                            ? "text-yellow-700 dark:text-yellow-400"
                            : "text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
