import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import CourseCard from "../../components/course/CourseCard";
import CourseFilters from "../../components/course/CourseFilters";
import { Select, Spin, Alert } from "antd";
import { getAllCourses } from "../../api/course";
import { useAuth } from "../../contexts/AuthContext";

export default function CoursesPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  const isTeacherOrAdmin = isTeacher || isAdmin;
  console.log("User role:", user?.role);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const fetchCourses = async (page) => {
    try {
      setLoading(true);
      const response = await getAllCourses(page, 10); // Default page size 10
      const data = response.data;
      setCourses(data.pageList);
      console.log("Fetched courses:", data.pageList);
      setTotalPages(data.totalPage);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      {isTeacherOrAdmin ? (
        <>
          <TeacherHeader />
          <div className="flex">
            <TeacherSidebar />
            <main className="flex-1 lg:ml-64 pt-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                  <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Tất cả khóa học
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                  <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
                    <CourseFilters />
                  </aside>

                  <div className="w-full lg:w-3/4 xl:w-4/5">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6 gap-4">
                      <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                        Hiển thị {totalElements} kết quả:
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Sắp xếp theo:
                        </span>
                        <Select
                          defaultValue="popular"
                          options={[
                            { value: "popular", label: "Phổ biến nhất" },
                            { value: "newest", label: "Mới nhất" },
                          ]}
                          className="text-sm font-medium rounded-lg w-40 h-10"
                        />
                      </div>
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <Spin size="large" />
                      </div>
                    ) : error ? (
                      <Alert
                        message="Lỗi"
                        description={error}
                        type="error"
                        showIcon
                      />
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {courses?.map((c) => (
                            <CourseCard
                              key={c.id}
                              id={c.id}
                              title={c.title}
                              author={c.teacherName}
                              image={
                                c.imageUrl ||
                                "https://via.placeholder.com/300x200?text=No+Image"
                              }
                              rating={0}
                              reviews={0}
                            />
                          ))}
                        </div>

                        {totalPages > 1 && (
                          <div className="flex justify-center mt-10">
                            <nav
                              aria-label="Pagination"
                              className="flex items-center gap-2"
                            >
                              <button
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                              >
                                <span className="material-symbols-outlined !text-xl">
                                  chevron_left
                                </span>
                              </button>

                              <span className="text-gray-600 dark:text-gray-300">
                                Trang {currentPage} / {totalPages}
                              </span>

                              <button
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                              >
                                <span className="material-symbols-outlined !text-xl">
                                  chevron_right
                                </span>
                              </button>
                            </nav>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Tất cả khóa học
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
                  <CourseFilters />
                </aside>

                <div className="w-full lg:w-3/4 xl:w-4/5">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6 gap-4">
                    <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                      Hiển thị {totalElements} kết quả:
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Sắp xếp theo:
                      </span>
                      <Select
                        defaultValue="popular"
                        options={[
                          { value: "popular", label: "Phổ biến nhất" },
                          { value: "newest", label: "Mới nhất" },
                        ]}
                        className="text-sm font-medium rounded-lg w-40 h-10"
                      />
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <Spin size="large" />
                    </div>
                  ) : error ? (
                    <Alert
                      message="Lỗi"
                      description={error}
                      type="error"
                      showIcon
                    />
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {courses?.map((c) => (
                          <CourseCard
                            key={c.id}
                            id={c.id}
                            title={c.title}
                            author={c.teacherName}
                            image={
                              c.imageUrl ||
                              "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            rating={0}
                            reviews={0}
                          />
                        ))}
                      </div>

                      {totalPages > 1 && (
                        <div className="flex justify-center mt-10">
                          <nav
                            aria-label="Pagination"
                            className="flex items-center gap-2"
                          >
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined !text-xl">
                                chevron_left
                              </span>
                            </button>

                            <span className="text-gray-600 dark:text-gray-300">
                              Trang {currentPage} / {totalPages}
                            </span>

                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined !text-xl">
                                chevron_right
                              </span>
                            </button>
                          </nav>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
