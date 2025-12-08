import React from "react";

export default function ChangePassword() {
  return (
    <>
      <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-black/10 dark:border-white/10">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white">
            Đổi mật khẩu
          </p>
          <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
            Quản lý mật khẩu của bạn để bảo mật tài khoản.
          </p>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-6 max-w-xl">
        <label className="flex flex-col min-w-40">
          <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
            Mật khẩu hiện tại
          </p>
          <div className="flex w-full flex-1 items-stretch rounded-lg">
            <input
              type="password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
        </label>
        <label className="flex flex-col min-w-40">
          <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
            Mật khẩu mới
          </p>
          <div className="flex w-full flex-1 items-stretch rounded-lg">
            <input
              type="password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
        </label>
        <label className="flex flex-col min-w-40">
          <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
            Xác nhận mật khẩu mới
          </p>
          <div className="flex w-full flex-1 items-stretch rounded-lg">
            <input
              type="password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
        </label>
      </div>
      <div className="flex justify-end gap-4 pt-6 border-t border-black/10 dark:border-white/10">
        <button className="flex items-center justify-center h-10 px-6 rounded-lg bg-background-light dark:bg-white/10 text-black dark:text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-black/5 dark:hover:bg-white/20 transition-colors">
          Hủy
        </button>
        <button className="flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-primary/90 transition-colors">
          Lưu thay đổi
        </button>
      </div>
    </>
  );
}
