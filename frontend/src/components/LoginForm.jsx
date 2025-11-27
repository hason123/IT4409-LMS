import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalNotification from "./ModalNotification";
import { EyeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { login, googleLogin } from "../api/auth";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username, password);
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      setLoading(false);
      navigate('/'); // chuyển hướng về Home
    } catch (err) {
      // setError(err.message || 'Đăng nhập thất bại');
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      const data = await googleLogin(credentialResponse);
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      setLoading(false);
      navigate('/'); // chuyển hướng về Home
    } catch (err) {
      setError('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleGoogleError = () => {
    setError('Đã xảy ra lỗi với Google Login. Vui lòng thử lại.');
    setShowModal(true);
  };

  return (
    <>
      {/* Hiển thị thông báo lỗi đăng nhập màu đỏ */}
      <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col w-full">
          <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">Email or Username</p>
          <div className="flex w-full items-stretch rounded-lg">
            <div className="text-[#617589] flex border border-r-0 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 items-center justify-center pl-3.5 pr-3.5 rounded-l-lg">
              <UserIcon className="h-5 w-5" />
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1"
              placeholder="Enter your email or username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
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
            <input
              type={showPassword ? "text" : "password"}
              className="form-input flex w-full min-w-0 flex-1"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="icon-area cursor-pointer"
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(v => !v)}
            >
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>
        </label>

        {error && (
          <div className="text-red-500 text-sm font-medium text-center mb-2">
            {error}
          </div>
        )}

        <button
          className="btn btn-primary w-full text-base font-bold"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <div className="flex items-center gap-4">
          <hr className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700" />
          <span className="text-[#617589] dark:text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700" />
        </div>

        <div className="w-full flex justify-center google-login-button">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleError}
            locale="vi_VN"
            theme="outline"
            size="large"
          />
        </div>

        <p className="text-center text-sm text-[#617589] dark:text-gray-400">By signing in, you agree to our <a className="font-medium text-primary hover:underline" href="#">Terms of Service</a> and <a className="font-medium text-primary hover:underline" href="#">Privacy Policy</a>.</p>
      </form>
    </>
  );
}
