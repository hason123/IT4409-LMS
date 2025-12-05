import React from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function DashboardCourseCard({ title, students, progress }) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow">
      <h4 className="font-bold text-[#111418] dark:text-white">{title}</h4>
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-4">
        <div className="flex items-center gap-1.5">
          <UserGroupIcon className="h-5 w-5" />
          <span>{students} học viên</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Tiến độ tổng thể
          </p>
          <p className="text-xs font-bold text-primary">{progress}%</p>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
