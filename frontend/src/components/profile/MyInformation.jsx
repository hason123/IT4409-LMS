import React, { useState } from "react";
import { CameraIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function MyInformation() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-black/10 dark:border-white/10">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white">
            Thông tin cá nhân
          </p>
          <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
            Cập nhật thông tin cá nhân của bạn tại đây.
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
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-grow w-full">
            <label className="flex flex-col min-w-40">
              <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
                Họ và tên
              </p>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                <input
                  disabled={!isEditing}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Nhập họ và tên của bạn"
                  defaultValue="Nguyen Van A"
                />
              </div>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col min-w-40">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
              Email
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                disabled={!isEditing}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Nhập email của bạn"
                type="email"
                defaultValue="nguyenvana@email.com"
              />
            </div>
          </label>
          <label className="flex flex-col min-w-40">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
              Số điện thoại
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                disabled={!isEditing}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Nhập số điện thoại của bạn"
                type="tel"
                defaultValue="0987654321"
              />
            </div>
          </label>
          <label className="flex flex-col min-w-40">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
              Ngày sinh
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                disabled={!isEditing}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                type="date"
                defaultValue="1995-08-15"
              />
            </div>
          </label>
          <label className="flex flex-col min-w-40">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
              Địa chỉ
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                disabled={!isEditing}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Nhập địa chỉ của bạn"
                defaultValue="123 Example St, District 1, Ho Chi Minh City"
              />
            </div>
          </label>
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
