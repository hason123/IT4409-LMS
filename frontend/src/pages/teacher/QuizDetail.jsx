import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Select, DatePicker, Form, Input, Button, Checkbox, Radio, message, Spin, Alert } from "antd";
import dayjs from "dayjs";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import { createQuiz, createQuizInChapter, getQuizById } from "../../api/quiz";
import {
  TrashIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function QuizDetail() {
  const { courseId, quizId, chapterId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!quizId;
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    timeLimitMinutes: 30,
    minPassScore: null,
    maxAttempts: null,
    questions: [
      {
        id: 1,
        type: "SINGLE_CHOICE",
        content: "",
        answers: [
          { id: 1, content: "", isCorrect: true },
          { id: 2, content: "", isCorrect: false },
          { id: 3, content: "", isCorrect: false },
        ],
      },
    ],
  });

  useEffect(() => {
    if (isEditMode && quizId) {
      fetchQuizData();
    } else {
      setLoading(false);
    }
  }, [quizId]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getQuizById(quizId);
      const quiz = response.data || response;
      
      // Update form initial values
      form.setFieldsValue({
        title: quiz.title || "",
        description: quiz.description || "",
        timeLimitMinutes: quiz.timeLimitMinutes ? String(quiz.timeLimitMinutes) : "30",
        minPassScore: quiz.minPassScore || undefined,
        maxAttempts: quiz.maxAttempts || undefined,
      });

      // Update quiz data with questions from backend
      const transformedQuestions = (quiz.questions || []).map(q => ({
        id: q.id,
        type: q.type || "SINGLE_CHOICE",
        content: q.content || "",
        answers: (q.answers || []).map(a => ({
          id: a.id,
          content: a.content || "",
          isCorrect: a.isCorrect || false,
        })),
      }));

      setQuizData({
        title: quiz.title || "",
        description: quiz.description || "",
        timeLimitMinutes: quiz.timeLimitMinutes || 30,
        minPassScore: quiz.minPassScore || null,
        maxAttempts: quiz.maxAttempts || null,
        questions: transformedQuestions.length > 0 ? transformedQuestions : quizData.questions,
      });
    } catch (err) {
      setError(err.message || "Lỗi khi tải dữ liệu bài kiểm tra");
      console.error("Error fetching quiz:", err);
      message.error("Lỗi khi tải dữ liệu bài kiểm tra");
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          id: Date.now(),
          type: "SINGLE_CHOICE",
          content: "",
          answers: [
            { id: 1, content: "", isCorrect: false },
            { id: 2, content: "", isCorrect: false },
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

  const handleQuestionChange = (questionId, content) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId ? { ...q, content } : q
      ),
    });
  };

  const handleOptionChange = (questionId, optionId, content) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((o) =>
                o.id === optionId ? { ...o, content } : o
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

        if (q.type === "SINGLE_CHOICE") {
          return {
            ...q,
            answers: q.answers.map((o) => ({
              ...o,
              isCorrect: o.id === optionId,
            })),
          };
        } else if (q.type === "MULTIPLE_CHOICE") {
          return {
            ...q,
            answers: q.answers.map((o) =>
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
              answers: [
                ...q.answers,
                { id: Date.now(), content: "", isCorrect: false },
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
              answers: q.answers.filter((o) => o.id !== optionId),
            }
          : q
      ),
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      setSubmitting(true);
      
      // Validate form fields
      if (!values.title || values.title.trim() === "") {
        message.error("Vui lòng nhập tiêu đề bài kiểm tra");
        setSubmitting(false);
        return;
      }

      if (!values.timeLimitMinutes || values.timeLimitMinutes === "") {
        message.error("Vui lòng nhập thời gian làm bài");
        setSubmitting(false);
        return;
      }

      // Validate questions
      if (!quizData.questions || quizData.questions.length === 0) {
        message.error("Vui lòng thêm ít nhất 1 câu hỏi");
        setSubmitting(false);
        return;
      }

      // Validate each question
      for (let q of quizData.questions) {
        if (!q.content || q.content.trim() === "") {
          message.error(`Câu hỏi ${quizData.questions.indexOf(q) + 1} không có nội dung`);
          setSubmitting(false);
          return;
        }
        if (q.type !== "ESSAY") {
          if (!q.answers || q.answers.length === 0) {
            message.error(`Câu hỏi ${quizData.questions.indexOf(q) + 1} không có đáp án`);
            setSubmitting(false);
            return;
          }
          // Validate at least one correct answer
          const hasCorrect = q.answers.some(a => a.isCorrect);
          if (!hasCorrect) {
            message.error(`Câu hỏi ${quizData.questions.indexOf(q) + 1} phải có ít nhất 1 đáp án đúng`);
            setSubmitting(false);
            return;
          }
          // Validate answer content
          for (let a of q.answers) {
            if (!a.content || a.content.trim() === "") {
              message.error(`Câu hỏi ${quizData.questions.indexOf(q) + 1} có đáp án không có nội dung`);
              setSubmitting(false);
              return;
            }
          }
        }
      }

      const formData = {
        ...values,
        timeLimitMinutes: parseInt(values.timeLimitMinutes) || 30,
        minPassScore: values.minPassScore ? parseInt(values.minPassScore) : 0,
        maxAttempts: values.maxAttempts ? parseInt(values.maxAttempts) : null,
        questions: quizData.questions,
      };

      let response;
      if (isEditMode) {
        // Update existing quiz
        // TODO: Implement update
        message.info("Chức năng cập nhật đang được phát triển");
        return;
      } else {
        // Create new quiz
        if (chapterId) {
          // Create quiz in chapter
          response = await createQuizInChapter(chapterId, formData);
          message.success("Tạo bài kiểm tra thành công");
        } else {
          // Create quiz directly to course
          response = await createQuiz(formData);
          message.success("Tạo bài kiểm tra thành công");
        }
        
        // Navigate back after success
        setTimeout(() => {
          if (chapterId) {
            navigate(`/teacher/courses/${courseId}`);
          } else {
            navigate(`/teacher/courses/${courseId}`);
          }
        }, 500);
      }
    } catch (error) {
      message.error(error.message || "Lỗi khi lưu bài kiểm tra");
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      <TeacherHeader />
      <div className="flex">
        <TeacherSidebar />
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 lg:ml-64 pt-16 flex flex-col h-screen">
          <div className="flex-1 overflow-y-auto p-6 md:px-12 md:py-8">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="large" tip="Đang tải dữ liệu..." />
              </div>
            ) : error ? (
              <Alert
                message="Lỗi"
                description={error}
                type="error"
                showIcon
                className="mb-4"
              />
            ) : (
            <div className="mx-auto flex flex-col gap-4 pb-24">
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
                  {isEditMode ? "Chỉnh sửa Quiz" : "Tạo Bài kiểm tra mới"}
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
              <Form
                layout="vertical"
                form={form}
                onFinish={handleFormSubmit}
                initialValues={{
                  title: "",
                  description: "",
                  timeLimitMinutes: "30",
                  minPassScore: undefined,
                  maxAttempts: undefined,
                }}
              >
                <div className="grid grid-cols-2 gap-x-4">
                  {/* Quiz Title */}
                  <Form.Item
                    label={
                      <span className="text-[#111418] dark:text-gray-200 text-base font-medium">
                        Tiêu đề bài kiểm tra
                      </span>
                    }
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tiêu đề bài kiểm tra",
                      },
                      {
                        min: 3,
                        message: "Tiêu đề bài kiểm tra phải có ít nhất 3 ký tự",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tiêu đề bài kiểm tra..."
                      className="h-12"
                    />
                  </Form.Item>
                  {/* Duration */}
                  <Form.Item
                    label={
                      <span className="text-[#111418] dark:text-gray-200 text-base font-medium">
                        Thời gian làm bài (phút)
                      </span>
                    }
                    name="timeLimitMinutes"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thời gian làm bài",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập số phút (0 = không giới hạn)..."
                      type="number"
                      className="h-12"
                      min={0}
                    />
                  </Form.Item>
                  {/* Min Pass Score */}
                  <Form.Item
                    label={
                      <span className="text-[#111418] dark:text-gray-200 text-base font-medium">
                        Điểm đạt (Tùy chọn)
                      </span>
                    }
                    name="minPassScore"
                  >
                    <Input
                      placeholder="Nhập điểm tối thiểu để đạt..."
                      type="number"
                      className="h-12"
                      min={0}
                      max={100}
                    />
                  </Form.Item>
                  {/* Max Attempts */}
                  <Form.Item
                    label={
                      <span className="text-[#111418] dark:text-gray-200 text-base font-medium">
                        Số lần làm bài (Tùy chọn)
                      </span>
                    }
                    name="maxAttempts"
                  >
                    <Input
                      placeholder="Số lần tối đa (0 = không giới hạn)..."
                      type="number"
                      className="h-12"
                      min={0}
                    />
                  </Form.Item>
                  {/* Description */}
                  <Form.Item
                    label={
                      <span className="text-[#111418] dark:text-gray-200 text-base font-medium">
                        Mô tả (Tùy chọn)
                      </span>
                    }
                    name="description"
                    className="md:col-span-2"
                  >
                    <Input.TextArea
                      placeholder="Thêm hướng dẫn hoặc ngữ cảnh cho học viên..."
                      rows={4}
                      className="rounded-lg text-sm"
                    />
                  </Form.Item>

                </div>
              </Form>

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
                              value: "SINGLE_CHOICE",
                              label: "Trắc nghiệm (1 đáp án)",
                            },
                            {
                              value: "MULTIPLE_CHOICE",
                              label: "Trắc nghiệm (Nhiều đáp án)",
                            },
                            { value: "ESSAY", label: "Tự luận" },
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
                    <div className="mb-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#617589] dark:text-gray-400 mb-2">
                        Nội dung câu hỏi
                      </label>
                      <Input.TextArea
                        placeholder="Nhập nội dung câu hỏi..."
                        rows={3}
                        value={question.content}
                        onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                    {/* Answer Options */}
                    {question.type !== "ESSAY" && (
                      <div className="flex flex-col gap-3 mt-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#617589] dark:text-gray-400">
                          Các lựa chọn
                        </label>
                        {question.answers.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-3 group"
                          >
                            <div className="shrink-0 flex items-center justify-center">
                              {question.type === "SINGLE_CHOICE" ? (
                                <Radio
                                  name={`q${question.id}_correct`}
                                  checked={option.isCorrect}
                                  onChange={() =>
                                    handleCorrectOptionChange(
                                      question.id,
                                      option.id
                                    )
                                  }
                                  title="Đánh dấu là đáp án đúng"
                                />
                              ) : (
                                <Checkbox
                                  checked={option.isCorrect}
                                  onChange={() =>
                                    handleCorrectOptionChange(
                                      question.id,
                                      option.id
                                    )
                                  }
                                  title="Đánh dấu là đáp án đúng"
                                />
                              )}
                            </div>
                            <div className="flex-1 relative">
                              <Input
                                placeholder="Lựa chọn"
                                value={option.content}
                                onChange={(e) =>
                                  handleOptionChange(
                                    question.id,
                                    option.id,
                                    e.target.value
                                  )
                                }
                                className={`rounded ${
                                  option.isCorrect
                                    ? "!border-green-500/50 !bg-green-50 dark:!bg-green-900/10"
                                    : ""
                                }`}
                                status={option.isCorrect ? "success" : ""}
                              />
                              {option.isCorrect && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                                  <CheckCircleIcon className="h-4 w-4" /> Đúng
                                </span>
                              )}
                            </div>
                            <Button
                              type="text"
                              danger
                              onClick={() =>
                                handleDeleteOption(question.id, option.id)
                              }
                              className="opacity-0 group-hover:opacity-100 p-1 text-[#617589] hover:text-red-500 transition-all"
                              icon={<XMarkIcon className="h-5 w-5" />}
                            />
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
            )}
          </div>

          {/* Sticky Bottom Actions */}
          {!loading && (
          <div className="w-full bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between md:justify-end gap-4 shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg w-full md:w-auto"
              disabled={submitting}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
              className="px-8 py-2.5 h-10 rounded-lg w-full md:w-auto flex items-center justify-center gap-2"
              icon={submitting ? <Spin size="small" /> : <CheckIcon className="h-5 w-5" />}
              disabled={submitting}
              loading={submitting}
            >
              {submitting ? "Đang lưu..." : "Lưu & Xuất bản"}
            </Button>
          </div>
          )}
        </main>
      </div>
    </div>
  );
}
