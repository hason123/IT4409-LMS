import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Select, DatePicker, Spin, Alert } from "antd";
import dayjs from "dayjs";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import {
  PhotoIcon,
  ArrowPathIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { createCourse, uploadCourseImage } from "../../api/course";
import { getAllCategories } from "../../api/category";

export default function CreateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isExistingCourse = !!id;
  const [isEditMode, setIsEditMode] = useState(!id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: null,
    image: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories(1, 100);
      const data = response.data;
      setCategories(data.pageList.map(cat => ({ value: cat.id, label: cat.title })));
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  // Mock data loading
  useEffect(() => {
    if (isExistingCourse) {
      // Simulate API call
      setFormData({
        title: "Lập trình Web Nâng cao",
        description:
          "Khóa học chuyên sâu về phát triển ứng dụng web hiện đại với React, Node.js và các công nghệ mới nhất.",
        categoryId: 1,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData(prev => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isExistingCourse) {
        // Update logic here (not implemented yet)
        console.log("Update course:", formData);
      } else {
        // Create course
        const newCourse = await createCourse({
          title: formData.title,
          description: formData.description,
          categoryId: formData.categoryId
        });

        // Upload image if selected
        if (imageFile && newCourse.id) {
          await uploadCourseImage(newCourse.id, imageFile);
        }

        navigate("/teacher/courses");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

            {error && (
              <Alert message="Lỗi" description={error} type="error" showIcon className="mb-6" />
            )}

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
                      required
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
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Field */}
                  <div>
                    <label
                      htmlFor="categoryId"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Lĩnh vực
                    </label>
                    <Select
                      id="categoryId"
                      value={formData.categoryId}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, categoryId: value }))
                      }
                      disabled={!isEditMode}
                      className="w-full h-[42px]"
                      options={categories}
                      placeholder="Chọn lĩnh vực"
                    />
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
                      disabled={loading}
                      className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30 disabled:opacity-50"
                    >
                      {loading ? <Spin size="small" /> : (isExistingCourse ? "Lưu thay đổi" : "Tạo khóa học")}
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