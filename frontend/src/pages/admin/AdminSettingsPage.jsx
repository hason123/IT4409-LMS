import React from "react";
import TeacherHeader from "../../components/layout/TeacherHeader";
import AdminSidebar from "../../components/layout/AdminSidebar";
import AccountSettings from "../../components/student/profile/AccountSettings";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      {/* Reusing TeacherHeader as AdminHeader */}
      <TeacherHeader />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 lg:ml-64 pt-16 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-[#111418] dark:text-white font-bold leading-tight tracking-[-0.015em]">
                Cài đặt
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Tùy chỉnh giao diện và cài đặt hệ thống.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <AccountSettings />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
