import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function QuizResult() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const resultData = {
    score: 8.0,
    totalScore: 10,
    isPassed: true,
    completedAt: "10:30, 20/10/2023",
    feedback: "Làm tốt lắm! Bạn đã nắm vững kiến thức cơ bản.",
    timeTaken: "15p 20s",
    correctCount: 8,
    wrongCount: 2,
    unansweredCount: 0,
    questions: [
      {
        id: 1,
        text: "HTML là viết tắt của cụm từ nào?",
        userAnswer: "HyperText Markup Language",
        correctAnswer: "HyperText Markup Language",
        isCorrect: true,
      },
      {
        id: 2,
        text: "Thẻ nào dùng để tạo danh sách không thứ tự trong HTML?",
        userAnswer: "<ol>",
        correctAnswer: "<ul>",
        isCorrect: false,
      },
      {
        id: 3,
        text: "Thuộc tính nào dùng để thay đổi màu chữ trong CSS?",
        userAnswer: "color",
        correctAnswer: "color",
        isCorrect: true,
      },
    ],
  };

  const handleRetake = () => {
    navigate(`/quizzes/${id}/attempt`);
  };

  const handleBackToCourse = () => {
    navigate(`/courses`); // Or specific course ID if available
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex w-full flex-col border-b border-solid border-b-[#f0f2f4] bg-white px-4 py-3 dark:border-gray-800 dark:bg-[#101922] md:px-10">
        <div className="flex items-center justify-between whitespace-nowrap">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4 text-[#111418] dark:text-white">
              <div className="size-8 text-primary">
                <svg
                  className="size-full"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="hidden text-lg font-bold leading-tight tracking-[-0.015em] md:block">
                EduPlatform
              </h2>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-4 md:gap-8">
            <div className="hidden items-center gap-9 md:flex">
              <a
                className="text-sm font-medium leading-normal text-[#111418] hover:text-primary dark:text-white"
                href="#"
              >
                Trang chủ
              </a>
              <a
                className="text-sm font-medium leading-normal text-[#111418] hover:text-primary dark:text-white"
                href="#"
              >
                Khóa học của tôi
              </a>
              <a
                className="text-sm font-medium leading-normal text-[#111418] hover:text-primary dark:text-white"
                href="#"
              >
                Cộng đồng
              </a>
            </div>
            <div
              className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQ8aWN9-5ZtRvzX3N2N8FsRcog6Sh1K7A-npqpRgOInL0kU4O1mf_YsKycv4kFdfz6O4rHVWZQhQfT6ofKug2djOzrenzg6oGFOwiXONge0Gum1gmmBryuPzk9kHeB5vGOkmYW0aXnXxreQp7I7Vqs7RfEzYhCRTs8y_ENsCOOzdIXlwipjjBpAyXZ1N4q8RroFb4TagYSDPq2k5fjtsZ4fN_ntqlM0ZiyipGEVyekXYTWQdpwgX69r1ongOU0970Od1dBvQp-Di0")',
              }}
            ></div>
          </div>
        </div>
      </header>

      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center px-4 py-5 md:px-10 lg:px-40">
          <div className="layout-content-container flex max-w-[960px] flex-1 flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 px-4">
              <a
                className="text-base font-medium leading-normal text-[#617589] hover:text-primary dark:text-gray-400"
                href="#"
              >
                Trang chủ
              </a>
              <span className="text-base font-medium leading-normal text-[#617589] dark:text-gray-500">
                /
              </span>
              <a
                className="text-base font-medium leading-normal text-[#617589] hover:text-primary dark:text-gray-400"
                href="#"
              >
                Lập trình Web
              </a>
              <span className="text-base font-medium leading-normal text-[#617589] dark:text-gray-500">
                /
              </span>
              <span className="text-base font-medium leading-normal text-[#111418] dark:text-white">
                Kết quả kiểm tra
              </span>
            </div>

            {/* Main Result Card (Hero) */}
            <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm dark:bg-[#1A2633] dark:shadow-gray-900 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                {/* Score Circle */}
                <div className="relative flex size-32 shrink-0 items-center justify-center rounded-full border-[6px] border-[#e6f4ea] bg-white dark:border-green-900/30 dark:bg-[#1A2633]">
                  <svg
                    className="absolute size-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className="text-[#e6f4ea] dark:text-green-900/30"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="44"
                      stroke="currentColor"
                      strokeWidth="6"
                    ></circle>
                    <circle
                      className="text-[#2eb85c]"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="44"
                      stroke="currentColor"
                      strokeDasharray="276"
                      strokeDashoffset={
                        276 - (276 * resultData.score) / resultData.totalScore
                      }
                      strokeLinecap="round"
                      strokeWidth="6"
                    ></circle>
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#111418] dark:text-white">
                      {resultData.score}
                    </span>
                    <span className="text-xs font-medium text-[#617589] dark:text-gray-400">
                      / {resultData.totalScore}
                    </span>
                  </div>
                </div>
                {/* Text Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black leading-tight tracking-[-0.033em] text-[#111418] dark:text-white md:text-3xl">
                      Kiểm tra giữa kỳ
                    </h1>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${
                        resultData.isPassed
                          ? "bg-[#e6f4ea] text-[#1d8f44] dark:bg-green-900/40 dark:text-green-400"
                          : "bg-[#fdecea] text-[#d32f2f] dark:bg-red-900/40 dark:text-red-400"
                      }`}
                    >
                      {resultData.isPassed ? "Đậu" : "Rớt"}
                    </span>
                  </div>
                  <p className="text-base font-normal leading-normal text-[#617589] dark:text-gray-400">
                    Hoàn thành lúc {resultData.completedAt}
                  </p>
                  <p className="text-base font-medium text-[#111418] dark:text-gray-200">
                    {resultData.feedback}
                  </p>
                </div>
              </div>
              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <button
                  onClick={handleRetake}
                  className="flex h-10 min-w-[140px] items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white transition hover:bg-blue-600"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  Làm lại bài
                </button>
                <button
                  onClick={handleBackToCourse}
                  className="flex h-10 min-w-[140px] items-center justify-center gap-2 rounded-lg bg-[#f0f2f4] px-4 text-sm font-bold text-[#111418] transition hover:bg-[#e0e2e4] dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  Về khóa học
                </button>
              </div>
            </div>

            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-[#dbe0e6] bg-white p-4 text-center dark:border-gray-700 dark:bg-[#1A2633]">
                <div className="flex items-center gap-2 text-[#617589] dark:text-gray-400">
                  <ClockIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Thời gian</span>
                </div>
                <p className="text-xl font-bold leading-tight text-[#111418] dark:text-white md:text-2xl">
                  {resultData.timeTaken}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-[#dbe0e6] bg-white p-4 text-center dark:border-gray-700 dark:bg-[#1A2633]">
                <div className="flex items-center gap-2 text-[#1d8f44] dark:text-green-400">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Câu đúng</span>
                </div>
                <p className="text-xl font-bold leading-tight text-[#111418] dark:text-white md:text-2xl">
                  {resultData.correctCount}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-[#dbe0e6] bg-white p-4 text-center dark:border-gray-700 dark:bg-[#1A2633]">
                <div className="flex items-center gap-2 text-[#d32f2f] dark:text-red-400">
                  <XCircleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Câu sai</span>
                </div>
                <p className="text-xl font-bold leading-tight text-[#111418] dark:text-white md:text-2xl">
                  {resultData.wrongCount}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-[#dbe0e6] bg-white p-4 text-center dark:border-gray-700 dark:bg-[#1A2633]">
                <div className="flex items-center gap-2 text-[#f57c00] dark:text-orange-400">
                  <QuestionMarkCircleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Chưa trả lời</span>
                </div>
                <p className="text-xl font-bold leading-tight text-[#111418] dark:text-white md:text-2xl">
                  {resultData.unansweredCount}
                </p>
              </div>
            </div>

            {/* Review Section */}
            <div className="flex flex-col gap-4">
              <h3 className="px-2 text-xl font-bold text-[#111418] dark:text-white">
                Chi tiết bài làm
              </h3>
              {resultData.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#dbe0e6] bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1A2633]"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div className="flex gap-3">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          question.isCorrect
                            ? "bg-[#e6f4ea] text-[#1d8f44] dark:bg-green-900/40 dark:text-green-400"
                            : "bg-[#fdecea] text-[#d32f2f] dark:bg-red-900/40 dark:text-red-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <h4 className="text-lg font-medium text-[#111418] dark:text-white">
                        {question.text}
                      </h4>
                    </div>
                    <span
                      className={`self-start rounded-full px-3 py-1 text-xs font-bold ${
                        question.isCorrect
                          ? "bg-[#e6f4ea] text-[#1d8f44] dark:bg-green-900/40 dark:text-green-400"
                          : "bg-[#fdecea] text-[#d32f2f] dark:bg-red-900/40 dark:text-red-400"
                      }`}
                    >
                      {question.isCorrect ? "Đúng" : "Sai"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-col gap-3 pl-0 sm:pl-11">
                    {/* User Answer */}
                    <div
                      className={`flex items-center gap-3 rounded-lg border p-3 ${
                        question.isCorrect
                          ? "border-[#e6f4ea] bg-[#f7fbf8] dark:border-green-900/30 dark:bg-green-900/10"
                          : "border-[#fdecea] bg-[#fff8f8] dark:border-red-900/30 dark:bg-red-900/10"
                      }`}
                    >
                      {question.isCorrect ? (
                        <CheckCircleIcon className="h-6 w-6 text-[#1d8f44] dark:text-green-400" />
                      ) : (
                        <XCircleIcon className="h-6 w-6 text-[#d32f2f] dark:text-red-400" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#617589] dark:text-gray-400">
                          Câu trả lời của bạn
                        </span>
                        <span className="font-medium text-[#111418] dark:text-white">
                          {question.userAnswer}
                        </span>
                      </div>
                    </div>
                    {/* Correct Answer (if wrong) */}
                    {!question.isCorrect && (
                      <div className="flex items-center gap-3 rounded-lg border border-[#e6f4ea] bg-[#f7fbf8] p-3 dark:border-green-900/30 dark:bg-green-900/10">
                        <CheckCircleIcon className="h-6 w-6 text-[#1d8f44] dark:text-green-400" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#617589] dark:text-gray-400">
                            Đáp án đúng
                          </span>
                          <span className="font-medium text-[#111418] dark:text-white">
                            {question.correctAnswer}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action */}
            <div className="mt-4 flex justify-center pb-10">
              <button className="text-sm font-medium text-[#617589] hover:text-primary dark:text-gray-400">
                Xem thêm các khóa học liên quan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}