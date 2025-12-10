import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import CourseCard from "../../components/course/CourseCard";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function TeacherCourses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'active', 'draft', 'archived'
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const [courses] = useState([
    {
      id: "CS102",
      title: "Lập trình Web Nâng cao",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjWYE9YVPV3H1zSqbOGW1RjnlaidRmejYvO_yFuwy1aWEz4NPu-b85eHuTCIZoQ404QcPBgP3Q7TzZu7WEo0fUD67zxmGFdz4KeGWy9PpcStSq-pqKVBMgJ18CZ3nFYDGAiCIk7sySK7pE3oRJ6g9B6DjA6AJngBkIyzXlve6MrFf5nHSH_CjwllCqB-8Ax20V572rWfezlemKtdRHh7Rmitv1e6Qf15Ni6JQ9Pv0peV_90PCIyHdrAaWW7AOqneM1A8RTNclhwbY",
      status: "active",
      code: "CS102",
      studentsCount: 35,
      schedule: "15/08/2023 - 15/12/2023",
    },
    {
      id: "DS101",
      title: "Nhập môn Khoa học Dữ liệu",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC31jh8oRUXkugcwSzMI5hztpCY8y8sjrrtYuZPCqIzHi9ftRSctRPAwnLMX4oOXEtc4SXebyICg_f7NOhzu_mNt8Xwgg4Fh3FU0xstrINslwtrG844uNane4ftdVPRzRrkVfOOLlXl-hyGuY0AQAZfAppHUTJlCoqwQrXWYLUNxsaQI6NWbTLNRxlzh-R4MZVG8Y9gBOu_2Q2zSPU-SFUSMkXwRip-GziSR_guuLDndkQqA_0ffe_XsQFMRHM_u_aEfoeUZGKBhiw",
      status: "draft",
      code: "DS101",
      studentsCount: 0,
      schedule: "Chưa có lịch",
    },
    {
      id: "UI201",
      title: "Thiết kế Giao diện Người dùng",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9QxPxPPDMxZtIFCj12bMWI7dXryfcXyfJSfYwRvfYXtsCSV18O3OLGn9_e4ht9JuYjY1GzP_dM7wanPhGiji-uY4gy2smZ5q_UINog43WGPZ4leN9qrWMmeHes1xA7ttm3CtKKc611wHqI2z9rzLj572MfsEGn-Wq0UXOaUEqLvXQzJBClrfO3tEksnx_1lyaD9E8U1nND3VcFw52JPkkfl7Kk53vq37LB2W1UzMK2woM04dEAWr7tJkq0pBjesp9461xLfxNuFs",
      status: "active",
      code: "UI201",
      studentsCount: 28,
      schedule: "01/09/2023 - 20/12/2023",
    },
  ]);

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true;
    return course.status === activeTab;
  });

  const handleCreateCourse = () => {
    navigate("/teacher/courses/create");
  };

  const handleEditCourse = (id) => {
    navigate(`/teacher/courses/${id}`);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      <TeacherHeader />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Reused structure from TeacherDashboard */}
        <TeacherSidebar />

        {/* Main Content */}
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 lg:ml-64 pt-16">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
            {/* Page Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl text-[#111418] dark:text-white font-bold leading-tight tracking-[-0.015em]">
                  Khóa học của tôi
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Quản lý tất cả các khóa học của bạn tại một nơi.
                </p>
              </div>
              <button
                onClick={handleCreateCourse}
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span>Tạo khóa học mới</span>
              </button>
            </div>

            {/* Toolbar & Filters */}
            <div className="flex flex-col gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm dark:text-white"
                  placeholder="Tìm kiếm theo tên hoặc mã khóa học..."
                />
              </div>

              {/* Filter Chips */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors ${
                    activeTab === "all"
                      ? "bg-primary/20 text-primary"
                      : "bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="text-sm font-medium">Tất cả</span>
                </button>
                <button
                  onClick={() => setActiveTab("active")}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors ${
                    activeTab === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="text-sm font-medium">Đang hoạt động</span>
                </button>
                <button
                  onClick={() => setActiveTab("draft")}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors ${
                    activeTab === "draft"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="text-sm font-medium">Bản nháp</span>
                </button>
                <button
                  onClick={() => setActiveTab("archived")}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors ${
                    activeTab === "archived"
                      ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      : "bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="text-sm font-medium">Đã lưu trữ</span>
                </button>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  type="teacher"
                  title={course.title}
                  image={course.image}
                  status={course.status}
                  code={course.code}
                  studentsCount={course.studentsCount}
                  schedule={course.schedule}
                  onPreview={() => handleEditCourse(course.id)}
                  onManage={() => handleEditCourse(course.id)}
                  onEdit={() => handleEditCourse(course.id)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
