
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 flex justify-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-solid border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8 py-3 w-full max-w-7xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w.org/2000/svg" className="w-8 h-8">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">LearnOnline</h2>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <button type="button" className="text-sm font-medium leading-normal text-[#111418] dark:text-white/90 hover:text-primary bg-transparent" onClick={() => navigate('/courses')}>Khóa học</button>
            <Link className="text-sm font-medium leading-normal text-[#111418] dark:text-white/90 hover:text-primary" to="#">Lộ trình học</Link>
            <Link className="text-sm font-medium leading-normal text-[#111418] dark:text-white/90 hover:text-primary" to="#">Giới thiệu</Link>
            <Link className="text-sm font-medium leading-normal text-[#111418] dark:text-white/90 hover:text-primary" to="#">Blog</Link>
            <Link className="text-sm font-medium leading-normal text-[#111418] dark:text-white/90 hover:text-primary" to="#">Liên hệ</Link>
          </nav>
        </div>

        <div className="flex flex-1 justify-end gap-2 sm:gap-4 items-center">
          <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full items-stretch rounded-lg">
                <div className="text-[#617589] flex border border-r-0 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 items-center justify-center pl-3.5 pr-3.5 rounded-l-lg h-10">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <input className="form-input flex w-full min-w-0 flex-1" style={{height: "40px"}} placeholder="Tìm kiếm..." />
            </div>
          </label>
          <div className="flex gap-2">
            <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-[#111418] dark:text-white text-sm font-bold transition-colors duration-150 hover:bg-slate-200 dark:hover:bg-slate-700">Đăng nhập</Link>
            <Link to="/register" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-colors duration-150 hover:bg-primary/90">Đăng ký</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
