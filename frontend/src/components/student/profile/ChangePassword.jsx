import React, { useState } from "react";
import { message, Form, Input, Button, Space } from "antd";
import { changePassword } from "../../../api/user";

export default function ChangePassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });
      message.success("Đổi mật khẩu thành công!");
      form.resetFields();
    } catch (err) {
      message.error(err.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
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

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="py-6 flex flex-col max-w-xl"
      >
        <Form.Item
          label={
            <p className="text-[#111418] dark:text-white text-sm font-medium">
              Mật khẩu hiện tại
            </p>
          }
          name="currentPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu hiện tại",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu hiện tại"
            className="rounded-lg h-10"
          />
        </Form.Item>

        <Form.Item
          label={
            <p className="text-[#111418] dark:text-white text-sm font-medium">
              Mật khẩu mới
            </p>
          }
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới",
            },
            {
              min: 6,
              message: "Mật khẩu mới phải có ít nhất 6 ký tự",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            className="rounded-lg h-10"
          />
        </Form.Item>

        <Form.Item
          label={
            <p className="text-[#111418] dark:text-white text-sm font-medium">
              Xác nhận mật khẩu mới
            </p>
          }
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu mới",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Nhập lại mật khẩu mới"
            className="rounded-lg h-10"
          />
        </Form.Item>
      </Form>

      <div className="flex justify-end gap-4 pt-4 border-t border-black/10 dark:border-white/10">
        <Button
          onClick={handleCancel}
          disabled={loading}
          className="h-10 px-6 rounded-lg font-bold"
        >
          Hủy
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => form.submit()}
          disabled={loading}
          loading={loading}
          className="h-10 px-6 rounded-lg font-bold"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>
    </>
  );
}
