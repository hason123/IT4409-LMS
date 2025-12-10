import React, { useState } from "react";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }
    if (!formData.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to change password
      // const response = await changePassword(formData);
      setSuccess("Đổi mật khẩu thành công!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setErrors({
        submit: err.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setErrors({});
    setSuccess("");
  };

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

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {errors.submit && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="py-6 flex flex-col gap-6 max-w-xl">
        <label className="flex flex-col min-w-40">
          <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
            Mật khẩu hiện tại
          </p>
          <div className="flex w-full flex-1 items-stretch rounded-lg">
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border dark:border-white/10 ${
                errors.currentPassword
                  ? "border-red-500"
                  : "border-black/10"
              }`}
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
          )}
        </label>

        <label className="flex flex-col min-w-40">
          <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
            Mật khẩu mới
          </p>
          <div className="flex w-full flex-1 items-stretch rounded-lg">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border dark:border-white/10 ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-black/10"
              }`}
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
          )}
        </label>

        <label className="flex flex-col min-w-40">
          <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
            Xác nhận mật khẩu mới
          </p>
          <div className="flex w-full flex-1 items-stretch rounded-lg">
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border dark:border-white/10 ${
                errors.confirmNewPassword
                  ? "border-red-500"
                  : "border-black/10"
              }`}
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>
          )}
        </label>
      </form>

      <div className="flex justify-end gap-4 pt-6 border-t border-black/10 dark:border-white/10">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="flex items-center justify-center h-10 px-6 rounded-lg bg-background-light dark:bg-white/10 text-black dark:text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-black/5 dark:hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </>
  );
}
