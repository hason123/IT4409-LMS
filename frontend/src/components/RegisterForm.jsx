import React from 'react'
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <label className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Full name</p>
        <div className="flex items-stretch rounded-lg">
          <div className="text-[#617589] flex border border-r-0 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 items-center justify-center pl-3.5 pr-3.5 rounded-l-lg">
            <UserIcon className="h-5 w-5" />
          </div>
          <input className="form-input flex w-full" placeholder="Your full name" />
        </div>
      </label>

      <label className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Email</p>
        <div className="flex items-stretch rounded-lg">
          <div className="text-[#617589] flex border border-r-0 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 items-center justify-center pl-3.5 pr-3.5 rounded-l-lg">
            <EnvelopeIcon className="h-5 w-5" />
          </div>
          <input className="form-input flex w-full" placeholder="you@example.com" />
        </div>
      </label>

      <label className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Password</p>
        <div className="input-group w-full">
          <div className="icon-area border-r border-[#dbe0e6] dark:border-gray-600">
            <LockClosedIcon className="h-5 w-5" />
          </div>
          <input type="password" className="form-input flex w-full" placeholder="Create a password" />
        </div>
      </label>

      <label className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Confirm password</p>
        <div className="input-group w-full">
          <div className="icon-area">
            <LockClosedIcon className="h-5 w-5" />
          </div>
          <input type="password" className="form-input flex w-full" placeholder="Confirm your password" />
        </div>
      </label>

      <button className="btn btn-primary w-full text-base font-bold">Create account</button>

      <p className="text-center text-sm text-[#617589] dark:text-gray-400">By registering, you agree to our <a className="font-medium text-primary hover:underline" href="#">Terms</a>.</p>
    </div>
  )
}
