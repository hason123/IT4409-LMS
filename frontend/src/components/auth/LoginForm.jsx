import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ModalNotification from "../common/ModalNotification";
import { EyeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { login, googleLogin } from "../../api/auth";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(username, password);
      console.log("Login response:", res);
      if (res.data && res.data.accessToken) {
        loginUser(res.data.accessToken, res.data.user);
      }
      setLoading(false);
      navigate("/"); // chuyển hướng về Home
    } catch (err) {
      // setError(err.message || 'Đăng nhập thất bại');
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setError("");
    setLoading(true);
    try {
      const res = await googleLogin(credentialResponse);
      if (res.data && res.data.accessToken) {
        loginUser(res.data.accessToken, res.data.user);
      }
      setLoading(false);
      navigate("/"); // chuyển hướng về Home
    } catch (err) {
      setError("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleGoogleError = () => {
    setError("Đã xảy ra lỗi với Google Login. Vui lòng thử lại.");
    setShowModal(true);
  };

  return (
    <>
      {/* Hiển thị thông báo lỗi đăng nhập màu đỏ */}
      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <p className="text-[#111418] dark:text-gray-200 text-sm font-medium pb-2">
            Email or Username
          </p>
          <div className="input-group w-full">
            <div className="icon-area border-r border-[#dbe0e6] dark:border-gray-600">
              <UserIcon className="h-5 w-5" />
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1"
              placeholder="Enter your email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center pb-2">
            <p className="text-[#111418] dark:text-gray-200 text-sm font-medium">
              Password
            </p>
            <a
              className="text-primary text-sm font-medium hover:underline"
              href="#"
            >
              Forgot password?
            </a>
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="icon-area cursor-pointer"
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((v) => !v)}
            >
              <EyeIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

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
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <div className="flex items-center gap-4">
          <hr className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700" />
          <span className="text-[#617589] dark:text-gray-400 text-sm">
            Or continue with
          </span>
          <hr className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700" />
        </div>

        <div className="w-full flex justify-center google-login-button">
          {/* Thêm thẻ div bọc ngoài với class w-fit */}
          <div className="w-fit">
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleGoogleError}
                locale="vi_VN"
                theme="outline"
                size="large"
                // width="300" // Hoặc bạn có thể set width cứng nếu muốn nó to bằng input trên
            />
          </div>
        </div>

        <p className="text-center text-sm text-[#617589] dark:text-gray-400">
          By signing in, you agree to our{" "}
          <a className="font-medium text-primary hover:underline" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="font-medium text-primary hover:underline" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </>
  );
}