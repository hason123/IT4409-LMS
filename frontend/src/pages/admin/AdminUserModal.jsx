import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, message, Avatar } from "antd";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";

export default function AdminUserModal({
  open = false,
  mode = "view", // "view" or "edit"
  user = null,
  onClose = () => {},
  onSave = async (data) => {},
}) {
  // Đồng bộ tên trường với UserRequest/UserInfoResponse của backend
  const [formData, setFormData] = useState({
    fullName: "",
    email: "", // Backend dùng email thay vì gmail
    role: "STUDENT",
    status: "active",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && user) {
      console.log("Loading user data into form:", user);
      setFormData({
        fullName: user.name || "",
        email: user.email || "", // Map từ email trong UserInfoResponse
        role: user.role || "STUDENT",
        status: user.status || "active",
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        role: "STUDENT",
        status: "active",
      });
    }
  }, [open, user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Gửi data theo cấu trúc UserRequest của backend
      // ID được truyền riêng để khớp với @PathVariable Integer id
      await onSave(user?.id, {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      });
      
      message.success(mode === "edit" ? "Cập nhật thành công" : "Tạo mới thành công");
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      message.error(error.response?.data?.message || "Thao tác thất bại");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "view" ? "Chi tiết người dùng" : "Chỉnh sửa thông tin";

  return (
    <Modal
      title={<span className="text-xl font-bold">{title}</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      closeIcon={<XMarkIcon className="h-5 w-5" />}
    >
      <div className="py-4 space-y-8">
        {/* User Profile Header */}
        <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <div className="relative group">
            <Avatar
              size={100}
              src={user?.avatar}
              className="border-4 border-white dark:border-gray-700 shadow-sm"
              alt={formData.fullName}
            >
              {formData.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            {mode === "edit" && (
              <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraIcon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.fullName || "N/A"}
            </h3>
            <p className="text-gray-500">{formData.email || "Chưa có email"}</p>
            <div className="mt-2 flex gap-2">
              <span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-md">
                {formData.role}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                formData.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {formData.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
              </span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Họ và Tên</label>
            <Input
              size="large"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              disabled={mode === "view"}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</label>
            <Input
              size="large"
              type="email"
              value={formData.email}
              disabled={true} // Thường email không cho sửa trực tiếp để tránh lỗi xác thực
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Vai trò hệ thống</label>
            <Select
              size="large"
              className="w-full"
              value={formData.role}
              onChange={(value) => handleChange("role", value)}
              disabled={mode === "view"}
              options={[
                { label: "Sinh viên", value: "STUDENT" },
                { label: "Giáo viên", value: "TEACHER" },
                { label: "Quản trị viên", value: "ADMIN" },
              ]}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Trạng thái</label>
            <Select
              size="large"
              className="w-full"
              value={formData.status}
              onChange={(value) => handleChange("status", value)}
              disabled={mode === "view"}
              options={[
                { label: "Hoạt động", value: "active" },
                { label: "Khóa tài khoản", value: "inactive" },
              ]}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button onClick={onClose} size="large">Đóng</Button>
          {mode === "edit" && (
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 min-w-[120px]"
            >
              Lưu thay đổi
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}