import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import {
  TrashIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function QuizDetail() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!quizId;

  const [quizData, setQuizData] = useState({
    title: isEditMode ? "Mid-term Review: Cell Structure" : "",
    description: "",
    timeLimit: "30",
    deadline: "",
    questions: [
      {
        id: 1,
        type: "single_choice",
        text: "",
        options: [
          { id: 1, text: "", isCorrect: false },
          { id: 2, text: "", isCorrect: true },
          { id: 3, text: "", isCorrect: false },
        ],
      },
    ],
  });

  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          id: Date.now(),
          type: "single_choice",
          text: "",
          options: [
            { id: 1, text: "", isCorrect: false },
            { id: 2, text: "", isCorrect: false },
          ],
        },
      ],
    });
  };

  const handleDeleteQuestion = (questionId) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter((q) => q.id !== questionId),
    });
  };

  const handleQuestionTypeChange = (questionId, type) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, type } : q
      ),
    });
  };

  const handleQuestionChange = (questionId, text) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, text } : q
      ),
    });
  };

  const handleOptionChange = (questionId, optionId, text) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      ),
    });
  };

  const handleCorrectOptionChange = (questionId, optionId) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) => {
        if (q.id !== questionId) return q;

        if (q.type === "single_choice") {
          return {
            ...q,
            options: q.options.map((o) => ({
              ...o,
              isCorrect: o.id === optionId,
            })),
          };
        } else if (q.type === "multiple_choice") {
          return {
            ...q,
            options: q.options.map((o) =>
              o.id === optionId ? { ...o, isCorrect: !o.isCorrect } : o
            ),
          };
        }
        return q;
      }),
    });
  };

  const handleAddOption = (questionId) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                { id: Date.now(), text: "", isCorrect: false },
              ],
            }
          : q
      ),
    });
  };

  const handleDeleteOption = (questionId, optionId) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== optionId),
            }
          : q
      ),
    });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      <TeacherHeader />
      <div className="flex">
        <TeacherSidebar />
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 lg:ml-64 pt-16 flex flex-col h-screen">
          <div className="flex-1 overflow-y-auto p-6 md:px-12 md:py-8">
            <div className="mx-auto flex flex-col gap-6 pb-24">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap gap-2 text-sm">
                <Link
                  to="/teacher/courses"
                  className="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors"
                >
                  Khóa học
                </Link>
                <span className="text-[#617589] dark:text-gray-400 font-medium">
                  /
                </span>
                <Link
                  to={`/courses/${courseId}`}
                  className="text-[#617589] dark:text-gray-400 font-medium hover:text-primary transition-colors"
                >
                  Chi tiết khóa học
                </Link>
                <span className="text-[#617589] dark:text-gray-400 font-medium">
                  /
                </span>
                <span className="text-[#111418] dark:text-white font-medium">
                  {isEditMode ? "Chỉnh sửa Quiz" : "Tạo Quiz mới"}
                </span>
              </div>

              {/* Page Heading */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-black text-[#111418] dark:text-white tracking-tight">
                    {isEditMode ? "Chỉnh sửa Quiz" : "Tạo Quiz mới"}
                  </h1>
                  <p className="text-[#617589] dark:text-gray-400 mt-1">
                    Thiết lập bài kiểm tra trắc nghiệm cho khóa học này.
                  </p>
                </div>
              </div>

              {/* General Settings Card */}
              <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
                    <AdjustmentsHorizontalIcon className="h-6 w-6 text-primary" />
                    Thông tin & Cài đặt
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quiz Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111418] dark:text-white mb-2">
                      Tiêu đề Quiz
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400"
                      placeholder="Ví dụ: Kiểm tra giữa kỳ: Cấu trúc tế bào"
                      type="text"
                      value={quizData.title}
                      onChange={(e) =>
                        setQuizData({ ...quizData, title: e.target.value })
                      }
                    />
                  </div>
                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111418] dark:text-white mb-2">
                      Mô tả (Tùy chọn)
                    </label>
                    <textarea
                      className="w-full p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 resize-none h-24"
                      placeholder="Thêm hướng dẫn hoặc ngữ cảnh cho học viên..."
                      value={quizData.description}
                      onChange={(e) =>
                        setQuizData({
                          ...quizData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-[#111418] dark:text-white mb-2">
                      Thời gian làm bài
                    </label>
                    <div className="relative">
                      <Select
                        className="w-full h-12"
                        size="large"
                        value={quizData.timeLimit}
                        onChange={(value) =>
                          setQuizData({
                            ...quizData,
                            timeLimit: value,
                          })
                        }
                        options={[
                          { value: "15", label: "15 Phút" },
                          { value: "30", label: "30 Phút" },
                          { value: "45", label: "45 Phút" },
                          { value: "60", label: "60 Phút" },
                          { value: "90", label: "90 Phút" },
                          { value: "0", label: "Không giới hạn" },
                        ]}
                      />
                    </div>
                  </div>
                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-[#111418] dark:text-white mb-2">
                      Hạn nộp bài
                    </label>
                    <div className="relative">
                      <DatePicker
                        className="w-full h-12"
                        size="large"
                        showTime
                        format="YYYY-MM-DD HH:mm"
                        placeholder="Chọn hạn nộp bài"
                        value={
                          quizData.deadline ? dayjs(quizData.deadline) : null
                        }
                        onChange={(date, dateString) =>
                          setQuizData({ ...quizData, deadline: dateString })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <h3 className="text-xl font-bold text-[#111418] dark:text-white">
                  Danh sách câu hỏi
                </h3>
                <span className="text-sm text-[#617589] dark:text-gray-400">
                  {quizData.questions.length} câu hỏi đã thêm
                </span>
              </div>

              {/* Questions List */}
              {quizData.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white dark:bg-card-dark rounded-xl border border-primary dark:border-primary shadow-lg ring-1 ring-primary/20 dark:ring-primary/20 transition-all"
                >
                  <div className="p-4 md:p-6 flex flex-col gap-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        <Select
                          value={question.type}
                          onChange={(value) =>
                            handleQuestionTypeChange(question.id, value)
                          }
                          variant="borderless"
                          className="min-w-[200px] font-semibold text-[#617589] dark:text-gray-400"
                          options={[
                            {
                              value: "single_choice",
                              label: "Trắc nghiệm (1 đáp án)",
                            },
                            {
                              value: "multiple_choice",
                              label: "Trắc nghiệm (Nhiều đáp án)",
                            },
                            { value: "essay", label: "Tự luận" },
                          ]}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 text-[#617589] dark:text-gray-400 hover:text-red-500 transition-colors"
                          title="Xóa câu hỏi"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    {/* Question Content */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#617589] dark:text-gray-400 mb-2">
                        Nội dung câu hỏi
                      </label>
                      <textarea
                        className="w-full p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 resize-none h-20 text-lg font-medium"
                        placeholder="Ví dụ: Đâu là nhà máy năng lượng của tế bào?"
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(question.id, e.target.value)
                        }
                      ></textarea>
                    </div>
                    {/* Answer Options */}
                    {question.type !== "essay" && (
                      <div className="flex flex-col gap-3 mt-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#617589] dark:text-gray-400">
                          Các lựa chọn
                        </label>
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-3 group"
                          >
                            <div className="shrink-0 flex items-center justify-center">
                              <input
                                className="w-5 h-5 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-pointer"
                                name={`q${question.id}_correct`}
                                type={
                                  question.type === "single_choice"
                                    ? "radio"
                                    : "checkbox"
                                }
                                checked={option.isCorrect}
                                onChange={() =>
                                  handleCorrectOptionChange(
                                    question.id,
                                    option.id
                                  )
                                }
                                title="Đánh dấu là đáp án đúng"
                              />
                            </div>
                            <div className="flex-1 relative">
                              <input
                                className={`w-full h-10 px-3 rounded border focus:outline-none transition-all text-sm ${
                                  option.isCorrect
                                    ? "bg-white dark:bg-gray-800 border-green-500/50 focus:border-primary font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/10"
                                    : "bg-[#f6f7f8] dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-primary"
                                }`}
                                placeholder={`Lựa chọn`}
                                type="text"
                                value={option.text}
                                onChange={(e) =>
                                  handleOptionChange(
                                    question.id,
                                    option.id,
                                    e.target.value
                                  )
                                }
                              />
                              {option.isCorrect && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                                  <CheckCircleIcon className="h-4 w-4" /> Đúng
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                handleDeleteOption(question.id, option.id)
                              }
                              className="opacity-0 group-hover:opacity-100 p-1 text-[#617589] hover:text-red-500 transition-all"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        {/* Add Option Button */}
                        <button
                          onClick={() => handleAddOption(question.id)}
                          className="flex items-center gap-2 text-primary hover:text-blue-600 text-sm font-bold py-2 w-fit"
                        >
                          <PlusCircleIcon className="h-5 w-5" />
                          Thêm lựa chọn khác
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Question Button */}
              <button
                onClick={handleAddQuestion}
                className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-[#617589] dark:text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <PlusCircleIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Thêm câu hỏi mới</span>
              </button>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="w-full bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between md:justify-end gap-4 shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-[#111418] dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full md:w-auto"
            >
              Hủy
            </button>
            <button className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 hover:bg-blue-600 transition-colors w-full md:w-auto flex items-center justify-center gap-2">
              <CheckIcon className="h-5 w-5" />
              Lưu & Xuất bản
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
