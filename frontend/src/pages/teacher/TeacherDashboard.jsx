import React from "react";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import QuickActionCard from "../../components/teacher/dashboard/QuickActionCard";
import DashboardCourseCard from "../../components/teacher/dashboard/DashboardCourseCard";
import StatItem from "../../components/teacher/dashboard/StatItem";
import NotificationItem from "../../components/teacher/dashboard/NotificationItem";
import {
  AcademicCapIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  TrophyIcon,
  ChatBubbleLeftEllipsisIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      {/* Teacher Header */}
      <TeacherHeader />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <TeacherSidebar />

        {/* Main Content */}
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 lg:ml-64 pt-16">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl text-[#111418] dark:text-white font-bold leading-tight tracking-[-0.015em]">
                  Dashboard Giáo viên
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Tổng quan hoạt động giảng dạy của bạn.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (2/3) */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-4 text-[#111418] dark:text-white">
                    Hành động nhanh
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickActionCard
                      icon={<PlusCircleIcon className="h-8 w-8" />}
                      label="Tạo khóa học"
                    />
                    <QuickActionCard
                      icon={<DocumentPlusIcon className="h-8 w-8" />}
                      label="Tạo bài giảng"
                    />
                    <QuickActionCard
                      icon={<ClipboardDocumentCheckIcon className="h-8 w-8" />}
                      label="Tạo Quiz"
                    />
                    <QuickActionCard
                      icon={<CalendarDaysIcon className="h-8 w-8" />}
                      label="Thêm lịch học"
                    />
                  </div>
                </div>

                {/* Teaching Courses */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#111418] dark:text-white">
                      Các khóa học đang giảng dạy
                    </h3>
                    <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                      <span>Xem tất cả</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DashboardCourseCard
                      title="Lập trình Python từ A-Z"
                      students="250"
                      progress={75}
                    />
                    <DashboardCourseCard
                      title="Thiết kế UI/UX cho người mới bắt đầu"
                      students="120"
                      progress={60}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column (1/3) */}
              <div className="flex flex-col gap-8">
                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-4 text-[#111418] dark:text-white">
                    Thống kê nhanh
                  </h3>
                  <div className="space-y-4">
                    <StatItem
                      icon={<TrophyIcon className="h-6 w-6" />}
                      colorClass="bg-green-500/10 text-green-500"
                      label="Điểm Quiz trung bình"
                      value="8.5 / 10"
                    />
                    <StatItem
                      icon={<AcademicCapIcon className="h-6 w-6" />}
                      colorClass="bg-blue-500/10 text-blue-500"
                      label="Học viên hoàn thành các khóa học"
                      value="345"
                    />
                  </div>
                </div>

                {/* Notifications & Requests */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-4 text-[#111418] dark:text-white">
                    Thông báo & Yêu cầu
                  </h3>
                  <div className="flex flex-col gap-4">
                    <NotificationItem
                      icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
                      colorClass="bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400"
                      text='Bạn có 5 bài quiz mới cần chấm trong khóa "Lập trình Python".'
                      time="1 giờ trước"
                    />
                    <NotificationItem
                      icon={<UserPlusIcon className="h-5 w-5" />}
                      colorClass="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
                      text='Có 3 yêu cầu duyệt học viên mới cho khóa "Thiết kế UI/UX".'
                      time="Hôm qua"
                    />
                    <NotificationItem
                      icon={<ChatBubbleLeftEllipsisIcon className="h-5 w-5" />}
                      colorClass="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
                      text='Nguyễn Thị C đã gửi tin nhắn về bài giảng "Biến và Kiểu dữ liệu".'
                      time="2 ngày trước"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
