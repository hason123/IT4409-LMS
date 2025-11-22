import React from 'react'
import { UserIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function LoginForm() {
  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <label className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Email or Username</p>
        <div className="flex w-full items-stretch rounded-lg">
            <div className="text-[#617589] flex border border-r-0 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 items-center justify-center pl-3.5 pr-3.5 rounded-l-lg">
              <UserIcon className="h-5 w-5" />
            </div>
          <input className="form-input flex w-full min-w-0 flex-1" placeholder="Enter your email or username" />
        </div>
      </label>

      <label className="flex flex-col w-full">
        <div className="flex justify-between items-center pb-2">
          <p className="text-[#111418] dark:text-gray-200 text-sm font-medium">Password</p>
          <a className="text-primary text-sm font-medium hover:underline" href="#">Forgot password?</a>
        </div>
          <div className="input-group w-full">
            <div className="icon-area border-r border-[#dbe0e6] dark:border-gray-600">
              <LockClosedIcon className="h-5 w-5" />
            </div>
            <input type="password" className="form-input flex w-full min-w-0 flex-1" placeholder="Enter your password" />
            <button type="button" className="icon-area cursor-pointer" aria-label="toggle password visibility">
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>
      </label>

      <button className="btn btn-primary w-full text-base font-bold">Sign In</button>

      <div className="flex items-center gap-4">
        <hr className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700" />
        <span className="text-[#617589] dark:text-gray-400 text-sm">Or continue with</span>
        <hr className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700" />
      </div>

      <button className="btn btn-outline text-sm font-medium">
        <img className="h-5 w-5" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
        <span>Google</span>
      </button>

      <p className="text-center text-sm text-[#617589] dark:text-gray-400">By signing in, you agree to our <a className="font-medium text-primary hover:underline" href="#">Terms of Service</a> and <a className="font-medium text-primary hover:underline" href="#">Privacy Policy</a>.</p>
    </div>
  )
}
