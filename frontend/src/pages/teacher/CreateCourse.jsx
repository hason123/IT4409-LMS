import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Spin,
  Alert,
  Upload,
  message,
} from "antd";
import {
  PhotoIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import { createCourse, uploadCourseImage, getCourseById, updateCourse } from "../../api/course";
import { getAllCategories } from "../../api/category";

const { TextArea } = Input;

export default function CreateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isExistingCourse = !!id;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(!id);

  /* ------------------ FETCH CATEGORIES ------------------ */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories(1, 100);
      setCategories(
        res.data.pageList.map(cat => ({
          value: cat.id,
          label: cat.title,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ------------------ LOAD COURSE ------------------ */
  useEffect(() => {
    if (isExistingCourse) {
      const fetchCourse = async () => {
        try {
          setLoading(true);
          const response = await getCourseById(id);
          // Handle potential data wrapper or direct response
          const data = response.data || response;
          form.setFieldsValue({
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            image: data.imageUrl,
          });
        } catch (err) {
          console.error(err);
          message.error("Không thể tải thông tin khóa học");
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [isExistingCourse, id, form]);

  /* ------------------ SUBMIT ------------------ */
  const onFinish = async (values) => {
    setLoading(true);
    setError(null);

    try {
      let courseId = id;
      if (isExistingCourse) {
        await updateCourse(id, {
          title: values.title,
          description: values.description,
          categoryId: values.categoryId,
        });
        message.success("Cập nhật khóa học thành công");
      } else {
        const response = await createCourse({
          title: values.title,
          description: values.description,
          categoryId: values.categoryId,
        });
        
        // Ensure we get the course object whether it's wrapped in data or not
        const course = response.data || response;
        courseId = course.id;

        if (!courseId) {
          throw new Error("Không thể lấy ID khóa học mới");
        }

        message.success("Tạo khóa học thành công");
      }

      // Only upload image if we have a valid courseId
      if (imageFile && courseId) {
        await uploadCourseImage(courseId, imageFile);
      }

      navigate("/teacher/courses");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ IMAGE UPLOAD ------------------ */
  const beforeUpload = (file) => {
    setImageFile(file);
    form.setFieldValue("image", URL.createObjectURL(file));
    return false; // chặn upload tự động
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <TeacherHeader />

      <div className="flex">
        <TeacherSidebar />

        <main className="flex-1 lg:ml-64 pt-16 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <header className="mb-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold">
                {isExistingCourse ? "Chi tiết khóa học" : "Tạo khóa học mới"}
              </h1>

              {isExistingCourse && !isEditMode && (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  Chỉnh sửa
                </button>
              )}
            </header>

            {error && (
              <Alert
                type="error"
                message="Lỗi"
                description={error}
                showIcon
                className="mb-6"
              />
            )}

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                disabled={!isEditMode}
                validateTrigger="onBlur"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* LEFT */}
                  <div className="lg:col-span-2 space-y-6">
                    <Form.Item
                      label="Tiêu đề khóa học"
                      name="title"
                      rules={[
                        { required: true, message: "Vui lòng nhập tiêu đề khóa học" },
                      ]}
                    >
                      <Input placeholder="Nhập tiêu đề khóa học" className="h-[40px]"/>
                    </Form.Item>

                    <Form.Item
                      label="Mô tả khóa học"
                      name="description"
                      rules={[
                        { required: true, message: "Vui lòng nhập mô tả khóa học" },
                      ]}
                    >
                      <TextArea rows={6} placeholder="Nhập mô tả chi tiết..." />
                    </Form.Item>
                  </div>

                  {/* RIGHT */}
                  <div className="space-y-6">
                    <Form.Item
                      label="Ảnh đại diện khóa học"
                    >
                      <Upload
                        beforeUpload={beforeUpload}
                        showUploadList={false}
                        accept="image/*"
                      >
                        <div className="h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-700">
                          {form.getFieldValue("image") ? (
                            <img
                              src={form.getFieldValue("image")}
                              alt="preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center w-full text-slate-500">
                              <PhotoIcon className="w-10 h-10 mx-auto mb-2" />
                              Nhấn để tải ảnh
                            </div>
                          )}
                        </div>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      label="Lĩnh vực"
                      name="categoryId"
                      rules={[
                        { required: true, message: "Vui lòng chọn lĩnh vực" },
                      ]}
                    >
                      <Select
                        placeholder="Chọn lĩnh vực"
                        options={categories}
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                </div>

                {isEditMode && (
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <button
                      type="button"
                      onClick={() => navigate("/teacher/courses")}
                      className="px-6 py-2 rounded-lg bg-slate-100"
                    >
                      Hủy
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-primary text-white"
                      disabled={loading}
                    >
                      {loading ? <Spin size="small" /> : "Tạo khóa học"}
                    </button>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
