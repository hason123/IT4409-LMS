import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import {
  PhotoIcon,
  ArrowPathIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function CreateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isExistingCourse = !!id;
  const [isEditMode, setIsEditMode] = useState(!id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    field: "Lập trình",
    startDate: "",
    endDate: "",
    image: null,
  });

  // Mock data loading
  React.useEffect(() => {
    if (isExistingCourse) {
      // Simulate API call
      setFormData({
        title: "Lập trình Web Nâng cao",
        description:
          "Khóa học chuyên sâu về phát triển ứng dụng web hiện đại với React, Node.js và các công nghệ mới nhất.",
        code: "CS102",
        field: "Lập trình",
        startDate: "2023-08-15",
        endDate: "2023-12-15",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDjWYE9YVPV3H1zSqbOGW1RjnlaidRmejYvO_yFuwy1aWEz4NPu-b85eHuTCIZoQ404QcPBgP3Q7TzZu7WEo0fUD67zxmGFdz4KeGWy9PpcStSq-pqKVBMgJ18CZ3nFYDGAiCIk7sySK7pE3oRJ6g9B6DjA6AJngBkIyzXlve6MrFf5nHSH_CjwllCqB-8Ax20V572rWfezlemKtdRHh7Rmitv1e6Qf15Ni6JQ9Pv0peV_90PCIyHdrAaWW7AOqneM1A8RTNclhwbY",
      });
    }
  }, [isExistingCourse]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateCode = () => {
    const randomCode =
      "COURSE-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    setFormData((prev) => ({ ...prev, code: randomCode }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    navigate("/teacher/courses");
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      <TeacherHeader />

      <div className="flex">
        <TeacherSidebar />

        <main className="flex-1 bg-slate-50 dark:bg-slate-900 lg:ml-64 pt-16 h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-[#111418] dark:text-white">
                {isExistingCourse ? "Chi tiết khóa học" : "Tạo khóa học mới"}
              </h1>
              {isExistingCourse && !isEditMode && (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                  Chỉnh sửa
                </button>
              )}
            </header>

            <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 lg:p-8 shadow-sm">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left Column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Tiêu đề khóa học
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      placeholder="Nhập tiêu đề cho khóa học của bạn"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-gray-800 disabled:text-slate-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Mô tả khóa học
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={!isEditMode}
                      rows={6}
                      placeholder="Nhập mô tả chi tiết về khóa học, mục tiêu và đối tượng học viên..."
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y disabled:bg-slate-100 dark:disabled:bg-gray-800 disabled:text-slate-500"
                    />
                  </div>

                  {/* Class Code */}
                  <div>
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Mã lớp học
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        placeholder="VD: TOAN10-2024"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-24 disabled:bg-slate-100 dark:disabled:bg-gray-800 disabled:text-slate-500"
                      />
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={generateCode}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-primary hover:text-primary/80 px-2 py-1 flex items-center gap-1"
                        >
                          <ArrowPathIcon className="h-4 w-4" />
                          Tạo tự động
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {/* Image Uploader */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Ảnh đại diện khóa học
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg ${
                          isEditMode
                            ? "cursor-pointer bg-slate-50 dark:bg-gray-700/50 hover:bg-slate-100 dark:hover:bg-gray-700"
                            : "cursor-not-allowed bg-slate-100 dark:bg-gray-800"
                        } transition-colors`}
                      >
                        {formData.image ? (
                          <img
                            src={formData.image}
                            alt="Course Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <PhotoIcon className="w-10 h-10 mb-3 text-slate-400" />
                            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                              <span className="font-semibold">
                                Nhấn để tải lên
                              </span>{" "}
                              hoặc kéo thả
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        )}
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          disabled={!isEditMode}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Field */}
                  <div>
                    <label
                      htmlFor="field"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Lĩnh vực
                    </label>
                    <Select
                      id="field"
                      value={formData.field}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, field: value }))
                      }
                      disabled={!isEditMode}
                      className="w-full h-[42px]"
                      options={[
                        { value: "Lập trình", label: "Lập trình" },
                        { value: "Toán học", label: "Toán học" },
                        { value: "Nghệ thuật", label: "Nghệ thuật" },
                        { value: "Vật lý", label: "Vật lý" },
                        { value: "Ngoại ngữ", label: "Ngoại ngữ" },
                      ]}
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Thời gian bắt đầu
                      </label>
                      <DatePicker
                        className="w-full h-[42px]"
                        format="DD/MM/YYYY"
                        value={
                          formData.startDate ? dayjs(formData.startDate) : null
                        }
                        onChange={(date) =>
                          setFormData((prev) => ({
                            ...prev,
                            startDate: date ? date.format("YYYY-MM-DD") : "",
                          }))
                        }
                        disabled={!isEditMode}
                        placeholder="Chọn ngày bắt đầu"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Thời gian kết thúc
                      </label>
                      <DatePicker
                        className="w-full h-[42px]"
                        format="DD/MM/YYYY"
                        value={
                          formData.endDate ? dayjs(formData.endDate) : null
                        }
                        onChange={(date) =>
                          setFormData((prev) => ({
                            ...prev,
                            endDate: date ? date.format("YYYY-MM-DD") : "",
                          }))
                        }
                        disabled={!isEditMode}
                        placeholder="Chọn ngày kết thúc"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                {isEditMode && (
                  <div className="lg:col-span-3 mt-4 flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        if (isExistingCourse) {
                          setIsEditMode(false);
                        } else {
                          navigate("/teacher/courses");
                        }
                      }}
                      className="px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30"
                    >
                      {isExistingCourse ? "Lưu thay đổi" : "Tạo khóa học"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
