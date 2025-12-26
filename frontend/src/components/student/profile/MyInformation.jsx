import React, { useState, useEffect } from "react";
import { CameraIcon, PencilIcon } from "@heroicons/react/24/solid";
import { updateUser, uploadUserAvatar } from "../../../api/user";
import { useAuth } from "../../../contexts/AuthContext";

export default function MyInformation({ userData, isLoading: parentLoading, onUpdate }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    gmail: "",
    phoneNumber: "",
    birthday: "",
    address: "",
  });
  const [loading, setLoading] = useState(parentLoading || true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Initialize form data from userData prop
  useEffect(() => {
    if (userData) {
      setInitialData(userData);
      setFormData({
        fullName: userData.fullName || "",
        gmail: userData.gmail || "",
        phoneNumber: userData.phoneNumber || "",
        birthday: userData.birthday || "",
        address: userData.address || "",
      });
      setAvatarPreview(userData.avatar || null);
      setLoading(false);
    }
  }, [userData]);

  // Update loading state from parent
  useEffect(() => {
    setLoading(parentLoading);
  }, [parentLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (!user?.id) {
        throw new Error("User ID not found");
      }
      
      const updatedUser = await updateUser(user.id, {
        ...formData,
        userName: initialData?.userName // Keep username as is
      });

      if (avatarFile) {
        await uploadUserAvatar(user.id, avatarFile);
        // Update avatar in updatedUser data if needed, or fetch user again
        // For now, we assume the avatar upload is successful and the preview is correct
      }
      
      setInitialData(updatedUser.data);
      if (onUpdate) {
        onUpdate({ ...updatedUser.data, avatar: avatarPreview });
      }
      setSuccess("Cập nhật thông tin thành công!");
      setIsEditing(false);
      setAvatarFile(null);
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Cập nhật thất bại. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        gmail: initialData.gmail || "",
        phoneNumber: initialData.phoneNumber || "",
        birthday: initialData.birthday || "",
        address: initialData.address || "",
      });
      setAvatarPreview(initialData.avatar || null);
      setAvatarFile(null);
    }
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-[#617589] dark:text-gray-400">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

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
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
          <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      <div className="py-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary text-white text-3xl font-bold uppercase">
                  {formData.fullName ? formData.fullName.charAt(0) : "U"}
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <CameraIcon className="h-8 w-8 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>

          <div className="flex-grow w-full">
            <label className="flex flex-col min-w-40">
              <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
                Họ và tên
              </p>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Nhập họ và tên của bạn"
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
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Nhập email của bạn"
                type="email"
              />
            </div>
          </label>
          <label className="flex flex-col min-w-40">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
              Số điện thoại
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Nhập số điện thoại của bạn"
                type="tel"
              />
            </div>
          </label>
          <label className="flex flex-col min-w-40">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
              Ngày sinh
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                type="date"
              />
            </div>
          </label>
          <label className="flex flex-col min-w-40">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal pb-2">
              Địa chỉ
            </p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white bg-transparent focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary h-11 placeholder:text-[#617589] dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal border border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Nhập địa chỉ của bạn"
              />
            </div>
          </label>
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end gap-4 pt-6 border-t border-black/10 dark:border-white/10">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex items-center justify-center h-10 px-6 rounded-lg bg-background-light dark:bg-white/10 text-black dark:text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-black/5 dark:hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold leading-normal tracking-[-0.015em] hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      )}
    </>
  );
}
