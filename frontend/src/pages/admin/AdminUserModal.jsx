import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, message } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AdminUserModal({
  open = false,
  mode = "view", // "view" or "edit"
  user = null,
  onClose = () => {},
  onSave = async (data) => {},
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    gmail: "",
    role: "STUDENT",
    status: "active",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && user) {
      setFormData({
        fullName: user.fullName || user.name || "",
        gmail: user.gmail || user.email || "",
        role: user.role || "STUDENT",
        status: user.status || "active",
      });
    } else if (open && !user) {
      // Reset to defaults khi modal mở không có user
      setFormData({
        fullName: "",
        gmail: "",
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
      await onSave({
        id: user?.id,
        ...formData,
      });
      message.success("Cập nhật người dùng thành công");
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      message.error("Lỗi: Không thể cập nhật người dùng");
    } finally {
      setLoading(false);
    }
  };

  const title =
    mode === "view" ? "Thông tin người dùng" : "Chỉnh sửa Người dùng";

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      closeIcon={<XMarkIcon className="h-5 w-5" />}
      className="dark:bg-gray-900"
    >
      {user && (
        <div className="space-y-6">
          {/* User Info Header */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${
                    user.avatar ||
                    "https://via.placeholder.com/96?text=" +
                      (user.fullName || user.name || "User").substring(0, 1)
                  }')`,
                }}
              />
              {mode === "edit" && (
                <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white hover:bg-primary/90">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Ngày tạo: {user.createdDate || "N/A"}
              </p>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.fullName || user.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.gmail || user.email}
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Họ và Tên
              </label>
              <Input
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={mode === "view"}
                className={
                  mode === "view" ? "dark:bg-gray-800" : "dark:bg-gray-900"
                }
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                type="email"
                placeholder="Nhập email"
                value={formData.gmail}
                onChange={(e) => handleChange("gmail", e.target.value)}
                disabled={mode === "view"}
                className={
                  mode === "view" ? "dark:bg-gray-800" : "dark:bg-gray-900"
                }
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Vai trò
              </label>
              <Select
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
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Trạng thái tài khoản
              </label>
              <Select
                value={formData.status}
                onChange={(value) => handleChange("status", value)}
                disabled={mode === "view"}
                options={[
                  { label: "Hoạt động", value: "active" },
                  { label: "Bị khóa", value: "inactive" },
                ]}
              />
            </div>
          </form>

          {/* Action Buttons */}
          {mode === "edit" && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <Button
                type="default"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              >
                🔑 Gửi lại xác thực
              </Button>
              <Button
                danger
                type="default"
                className="dark:text-red-400"
              >
                🔒 Khóa tài khoản
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button onClick={onClose}>Hủy</Button>
            {mode === "edit" && (
              <Button
                type="primary"
                onClick={handleSave}
                loading={loading}
                className="bg-primary hover:bg-primary/90"
              >
                Lưu thay đổi
              </Button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
