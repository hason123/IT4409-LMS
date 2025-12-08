import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserIcon, EnvelopeIcon, LockClosedIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import { register } from '../../api/auth'
import { useAuth } from '../../contexts/AuthContext'

export default function RegisterForm() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'username':
        if (!value.trim()) error = 'Vui lòng nhập tên đăng nhập';
        break;
      case 'fullName':
        if (!value.trim()) error = 'Vui lòng nhập họ tên';
        break;
      case 'email':
        if (!value.trim()) error = 'Vui lòng nhập email';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email không hợp lệ';
        break;
      case 'password':
        if (!value) error = 'Vui lòng nhập mật khẩu';
        else if (value.length < 6) error = 'Mật khẩu phải có ít nhất 6 ký tự';
        break;
      case 'confirmPassword':
        if (!value) error = 'Vui lòng xác nhận mật khẩu';
        else if (formData.password && value !== formData.password) error = 'Mật khẩu không khớp';
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key === 'role') return;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const roleName = formData.role === 'STUDENT' ? 'USER' : 'TEACHER';
      const requestData = {
        userName: formData.username,
        fullName: formData.fullName,
        gmail: formData.email,
        password: formData.password,
        roleName: roleName,
        phoneNumber: "",
        address: "",
        birthday: "",
        studentNumber: ""
      };

      const res = await register(requestData);
      console.log('Registration response:', res);
      if (res.data && res.data.accessToken) {
        loginUser(res.data.accessToken, res.data.user);
        console.log('Registered and logged in successfully');
        navigate('/');
      } else {
        // Should not happen if register returns login response
        navigate('/login');
      }
    } catch (err) {
      setApiError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{apiError}</span>
        </div>
      )}

      <div className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Username <span className="text-red-500">*</span></p>
        <div className={`input-group w-full ${errors.username ? '!border-red-500' : ''}`}>
          <div className={`icon-area border-r border-[#dbe0e6] dark:border-gray-600 ${errors.username ? '!border-red-500' : ''}`}>
            <UserIcon className="h-5 w-5" />
          </div>
          <input 
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-input flex w-full" 
            placeholder="Create a username" 
          />
        </div>
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>

      <div className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Full name <span className="text-red-500">*</span></p>
        <div className={`input-group w-full ${errors.fullName ? '!border-red-500' : ''}`}>
          <div className={`icon-area border-r border-[#dbe0e6] dark:border-gray-600 ${errors.fullName ? '!border-red-500' : ''}`}>
            <UserIcon className="h-5 w-5" />
          </div>
          <input 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input flex w-full`} 
            placeholder="Your full name" 
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Email <span className="text-red-500">*</span></p>
        <div className={`input-group w-full ${errors.email ? '!border-red-500' : ''}`}>
          <div className={`icon-area border-r border-[#dbe0e6] dark:border-gray-600 ${errors.email ? '!border-red-500' : ''}`}>
            <EnvelopeIcon className="h-5 w-5" />
          </div>
          <input 
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input flex w-full`} 
            placeholder="you@example.com" 
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Password <span className="text-red-500">*</span></p>
        <div className={`input-group w-full ${errors.password ? '!border-red-500' : ''}`}>
          <div className={`icon-area border-r border-[#dbe0e6] dark:border-gray-600 ${errors.password ? '!border-red-500' : ''}`}>
            <LockClosedIcon className="h-5 w-5" />
          </div>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-input flex w-full" 
            placeholder="Create a password" 
          />
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Confirm password <span className="text-red-500">*</span></p>
        <div className={`input-group w-full ${errors.confirmPassword ? '!border-red-500' : ''}`}>
          <div className={`icon-area border-r border-[#dbe0e6] dark:border-gray-600 ${errors.confirmPassword ? '!border-red-500' : ''}`}>
            <LockClosedIcon className="h-5 w-5" />
          </div>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input flex w-full ${errors.confirmPassword ? '!border !border-red-500 focus:!border-red-500' : ''}`} 
            placeholder="Confirm your password" 
          />
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>

      <div className="flex flex-col w-full">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Đăng ký tài khoản <span className="text-red-500">*</span></p>
        <div className="flex items-center gap-6 px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="radio" 
                name="role" 
                value="STUDENT" 
                checked={formData.role === 'STUDENT'} 
                onChange={handleChange}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-primary checked:bg-primary transition-all"
              />
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-[#111418] dark:text-gray-200 text-sm group-hover:text-primary transition-colors">Sinh viên</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="radio" 
                name="role" 
                value="LECTURER" 
                checked={formData.role === 'LECTURER'} 
                onChange={handleChange}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-primary checked:bg-primary transition-all"
              />
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-[#111418] dark:text-gray-200 text-sm group-hover:text-primary transition-colors">Giảng viên</span>
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full text-base font-bold" disabled={loading}>
        {loading ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-center text-sm text-[#617589] dark:text-gray-400">By registering, you agree to our <a className="font-medium text-primary hover:underline" href="#">Terms</a>.</p>
    </form>
  )
}
