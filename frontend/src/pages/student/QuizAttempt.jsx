import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ClockIcon,
  FlagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PaperAirplaneIcon,
  Squares2X2Icon,
  CloudArrowUpIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { FlagIcon as FlagIconSolid } from "@heroicons/react/24/solid";

export default function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const totalQuestions = 20;
  const initialTime = 45 * 60; // 45 minutes in seconds

  // State
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(4); // Start at question 5 (index 4) for demo
  const [answers, setAnswers] = useState({ 1: "A", 2: "B", 3: "C", 4: "D", 5: "B" }); // Mock answered questions
  const [flaggedQuestions, setFlaggedQuestions] = useState([7]); // Mock flagged question
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Question Data
  const currentQuestion = {
    id: 5,
    text: "Giải phương trình sau: 2x + 5 = 15. Giá trị của x là bao nhiêu?",
    options: [
      { id: "A", text: "x = 2" },
      { id: "B", text: "x = 5" },
      { id: "C", text: "x = 10" },
      { id: "D", text: "x = 0" },
    ],
  };

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format Time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handlers
  const handleAnswerSelect = (optionId) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const toggleFlag = () => {
    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions(flaggedQuestions.filter((id) => id !== currentQuestion.id));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.id]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Submit logic here
    // alert("Nộp bài thành công!");
    navigate(`/quizzes/${id}/result`);
  };

  const getQuestionStatusClass = (index) => {
    const questionNum = index + 1;
    const isCurrent = currentQuestionIndex === index;
    const isAnswered = answers[questionNum];
    const isFlagged = flaggedQuestions.includes(questionNum);

    let baseClass = "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors relative ";

    if (isCurrent) {
      return baseClass + "border-2 border-primary bg-primary/10 text-primary font-bold ring-2 ring-primary/20";
    }
    if (isFlagged) {
      return baseClass + "bg-yellow-400 text-white hover:bg-yellow-500";
    }
    if (isAnswered) {
      return baseClass + "bg-primary text-white hover:bg-primary/90";
    }
    return baseClass + "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700";
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display flex flex-col h-screen overflow-hidden antialiased selection:bg-primary/20 selection:text-primary">
      {/* Top Header (Sticky) */}
      <header className="flex-none bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 z-30">
        <div className="h-full px-4 md:px-6 flex items-center justify-between w-full max-w-[1920px] mx-auto">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[24px] font-bold">school</span>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold leading-tight tracking-tight">
                Kiểm tra giữa kỳ môn Toán
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Học kỳ 1 - Năm học 2023-2024
              </p>
            </div>
          </div>

          {/* Right: Mobile Menu / Status */}
          <div className="flex items-center gap-4">
            {/* Desktop Timer (Moved) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <ClockIcon className="h-5 w-5 text-primary" />
              <span className="font-mono text-lg font-bold text-primary tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Mobile Timer (Compact) */}
            <div className="md:hidden flex items-center gap-1 text-primary font-bold bg-primary/10 px-2 py-1 rounded">
              <ClockIcon className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Tiến độ
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${(Object.keys(answers).length / totalQuestions) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs font-bold">
                  {Object.keys(answers).length}/{totalQuestions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Question Area (Scrollable) */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Progress Bar (Mobile Only) */}
          <div className="sm:hidden w-full h-1 bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${(Object.keys(answers).length / totalQuestions) * 100}%`,
              }}
            ></div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Question Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shadow-sm">
                      {currentQuestionIndex + 1}
                    </span>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                      Câu hỏi {currentQuestionIndex + 1}
                    </h2>
                  </div>
                  <button
                    onClick={toggleFlag}
                    className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded transition-colors ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                        : "text-slate-400 hover:text-yellow-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {flaggedQuestions.includes(currentQuestion.id) ? (
                      <FlagIconSolid className="h-5 w-5" />
                    ) : (
                      <FlagIcon className="h-5 w-5" />
                    )}
                    <span className="hidden sm:inline">Đánh dấu</span>
                  </button>
                </div>

                {/* Question Content */}
                <div className="p-6 md:p-8">
                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
                    Giải phương trình sau:{" "}
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-primary">
                      2x + 5 = 15
                    </span>
                    . Giá trị của x là bao nhiêu?
                  </p>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <label
                        key={option.id}
                        className="group block cursor-pointer relative"
                      >
                        <input
                          className="peer sr-only"
                          name={`question_${currentQuestion.id}`}
                          type="radio"
                          value={option.id}
                          checked={answers[currentQuestion.id] === option.id}
                          onChange={() => handleAnswerSelect(option.id)}
                        />
                        <div className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 group-hover:border-primary/50">
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-500 mr-4 flex-shrink-0 relative flex items-center justify-center peer-checked:border-primary">
                            {answers[currentQuestion.id] === option.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <span className="text-slate-700 dark:text-slate-200 font-medium select-none">
                            {option.id}. {option.text}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Auto-save Indicator */}
                <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <CloudArrowUpIcon className="h-4 w-4" />
                    Đã lưu lúc 10:15
                  </span>
                </div>
              </div>

              {/* Navigation Action Bar */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 font-semibold transition-colors ${
                    currentQuestionIndex === 0
                      ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Câu trước</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold shadow-md transition-all transform active:scale-95 ${
                    currentQuestionIndex === totalQuestions - 1
                      ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                  }`}
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Column: Navigation Sidebar */}
        <aside className="hidden lg:flex flex-col w-[320px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-20 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">
              Danh sách câu hỏi
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Chọn một số để chuyển câu
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {/* Legend */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-600 dark:text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Đã làm</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span>Đánh dấu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-primary"></div>
                <span>Đang làm</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <span>Chưa làm</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: totalQuestions }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={getQuestionStatusClass(index)}
                >
                  {index + 1}
                  {flaggedQuestions.includes(index + 1) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
              Nộp bài
            </button>
            <p className="text-xs text-center text-slate-500 mt-3">
              Hãy kiểm tra kỹ trước khi nộp bài
            </p>
          </div>
        </aside>

        {/* Mobile Floating Action Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-slate-800 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-slate-700 active:scale-90 transition-all"
        >
          <Squares2X2Icon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}