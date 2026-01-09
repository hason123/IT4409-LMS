import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import CourseTabs from "../../components/course/CourseTabs";
import DescriptionCourse from "../../components/course/DescriptionCourse";
import CourseContent from "../../components/course/CourseContent";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getCourseById } from "../../api/course";
import { Spin, Alert } from "antd";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CourseDetailPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const isTeacher = user?.role === "TEACHER";
  const isAdmin = user?.role === "ADMIN";
  const isStudent = user?.role === "STUDENT";
  const isTeacherOrAdmin = isTeacher || isAdmin;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseById(id);
        console.log("Fetched course details:", response);
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating % 1) >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`full-${i}`}
          className="material-symbols-outlined !text-base text-yellow-500"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          star
        </span>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span
          key="half"
          className="material-symbols-outlined !text-base text-yellow-500"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          star_half
        </span>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          className="material-symbols-outlined !text-base text-gray-300 dark:text-gray-600"
          style={{ fontVariationSettings: '"FILL" 0' }}
        >
          star
        </span>
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#333333] dark:text-gray-200">
      {isTeacherOrAdmin ? (
        <>
          <TeacherHeader />
          <div className="flex">
            <TeacherSidebar />
            <main className="flex-1 lg:ml-64 pt-16 w-full">
              <div className="container mx-auto sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                  onClick={() => navigate("/teacher/courses")}
                  className="flex items-center gap-2 mb-3 text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span className="font-medium">
                    Quay lại danh sách khóa học
                  </span>
                </button>
                <div className="grid grid-cols-12 gap-8">
                  {/* Main Content (Left Column) */}
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex flex-col gap-4 mb-6">
                      <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                        {course.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300 mt-2">
                        <div className="flex items-center gap-2">
                          {course.teacherImageUrl ? (
                            <img
                              alt={`Avatar giảng viên ${course.teacherName}`}
                              className="w-8 h-8 rounded-full object-cover"
                              src={course.teacherImageUrl}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white font-semibold text-xs">
                              {course.teacherName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span>
                            Giảng viên:{" "}
                            <span className="font-semibold text-[#111418] dark:text-white">
                              {course.teacherName}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-yellow-500">{course.rating?.toFixed(1) || "0.0"}</span>
                          <div className="flex gap-0.5 text-yellow-500">
                            {renderStars(course.rating)}
                          </div>
                          <span className="text-gray-500 dark:text-gray-400">
                            (12,455 đánh giá)
                          </span>
                        </div>
                      </div>
                      {user?.role !== "TEACHER" && (
                        <button className="w-full flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-transparent text-primary dark:text-primary border-2 border-primary text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/10 transition-colors">
                          <span className="truncate">Đăng ký học</span>
                        </button>
                      )}
                    </div>
                    {/* Tabs */}
                    <div className="w-full">
                      {/* Tabs */}
                      <CourseTabs
                        tabs={[
                          {
                            label: "Mô tả",
                            content: (
                              <DescriptionCourse
                                description={course.description}
                              />
                            ),
                          },
                          {
                            label: "Nội dung khóa học",
                            content: <CourseContent />,
                          },
                          { label: "Giảng viên", content: <div>...</div> },
                          { label: "Đánh giá", content: <div>...</div> },
                        ]}
                        defaultIndex={0}
                      />
                    </div>
                  </div>
                  {/* Sidebar (Right Column) */}
                  <div className="col-span-12 lg:col-span-4">
                    <div className="sticky top-24 space-y-6">
                      {/* Course Info List */}
                      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-4">
                          Thông tin khóa học
                        </h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                          <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                              schedule
                            </span>
                            <span>Thời lượng: 30 giờ video</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                              slideshow
                            </span>
                            <span>Số bài giảng: 215</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                              bar_chart
                            </span>
                            <span>Cấp độ: Mọi cấp độ</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                              language
                            </span>
                            <span>Ngôn ngữ: Tiếng Việt</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                              workspace_premium
                            </span>
                            <span>Có chứng chỉ hoàn thành</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <>
          <Header />
          <main className="w-full">
            <div className="container mx-auto px-4 py-8">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Link className="text-primary text-sm font-medium" to="/">
                  Trang chủ
                </Link>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  /
                </span>
                <Link
                  className="text-primary text-sm font-medium"
                  to="/courses"
                >
                  Khóa học
                </Link>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  /
                </span>
                <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {course.title}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-8">
                {/* Main Content (Left Column) */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="flex flex-col gap-4 mb-6">
                    <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                      {course.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <div className="flex items-center gap-2">
                        <img
                          alt={`Avatar giảng viên ${course.teacherName}`}
                          className="w-8 h-8 rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhE6xdMrjAf3wdfHim4XGXWu3OqQvnxB4867xflSLd5V9-yT4yG-ZMEZiwrIirdOFJzHqSp2-MTT68oHt7LaXzL9ujl-dzXRiw7I9NOiXuUE1L9s1P3Kc3bolXXCDB6v5XhXbwdprTYw1DyT6YlY6D1-uN8gLHOsrNKkLNN40ldPvbDCyTUCXUnV7mBp3VNsJMOdl5pPtgJCCnpF1l9a9SFvc9W47I9P5dSub8YrS3UvjRb7xT_IEtbW2JljPyy3QAivITahhBpb4"
                        />
                        <span>
                          Giảng viên:{" "}
                          <span className="font-semibold text-[#111418] dark:text-white">
                            {course.teacherName}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-yellow-500">4.7</span>
                        <div className="flex text-yellow-500">
                          <span
                            className="material-symbols-outlined !text-base"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          <span
                            className="material-symbols-outlined !text-base"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          <span
                            className="material-symbols-outlined !text-base"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          <span
                            className="material-symbols-outlined !text-base"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                          <span
                            className="material-symbols-outlined !text-base"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star_half
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                          (12,455 đánh giá)
                        </span>
                      </div>
                    </div>
                    {isStudent && (
                      <button className="w-full flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-transparent text-primary dark:text-primary border-2 border-primary text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/10 transition-colors">
                        <span className="truncate">Đăng ký học</span>
                      </button>
                    )}
                  </div>
                  {/* Tabs */}
                  <div className="w-full">
                    {/* Tabs */}
                    <CourseTabs
                      tabs={[
                        {
                          label: "Mô tả",
                          content: (
                            <DescriptionCourse
                              description={course.description}
                            />
                          ),
                        },
                        {
                          label: "Nội dung khóa học",
                          content: <CourseContent />,
                        },
                        { label: "Giảng viên", content: <div>...</div> },
                        { label: "Đánh giá", content: <div>...</div> },
                      ]}
                      defaultIndex={0}
                    />
                  </div>
                </div>
                {/* Sidebar (Right Column) */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="sticky top-24 space-y-6">
                    {/* Course Info List */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-4">
                        Thông tin khóa học
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                            schedule
                          </span>
                          <span>Thời lượng: 30 giờ video</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                            slideshow
                          </span>
                          <span>Số bài giảng: 215</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                            bar_chart
                          </span>
                          <span>Cấp độ: Mọi cấp độ</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                            language
                          </span>
                          <span>Ngôn ngữ: Tiếng Việt</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                            workspace_premium
                          </span>
                          <span>Có chứng chỉ hoàn thành</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
