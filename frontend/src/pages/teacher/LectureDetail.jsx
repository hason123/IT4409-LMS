import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TeacherHeader from "../../components/layout/TeacherHeader";
import TeacherSidebar from "../../components/layout/TeacherSidebar";
import {
  TrashIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Form, Input, Button, Spin, Alert } from "antd";
import { getCourseById } from "../../api/course";

export default function LectureDetail() {
  const { courseId, lectureId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const isEditMode = !!lectureId;

  const [title, setTitle] = useState(
    isEditMode ? "Bài 3: Đạo hàm và Ứng dụng" : ""
  );
  const [content, setContent] = useState(
    isEditMode
      ? "Chào các em, trong bài học hôm nay chúng ta sẽ tìm hiểu về định nghĩa đạo hàm và các quy tắc tính đạo hàm cơ bản..."
      : ""
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = React.useRef(null);

  const extractVideoId = (url) => {
    if (!url) return null;

    // YouTube URL patterns
    const youtubeRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return { platform: "youtube", id: youtubeMatch[1] };
    }

    // Vimeo URL pattern
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return { platform: "vimeo", id: vimeoMatch[1] };
    }

    return null;
  };

  const getVideoEmbedUrl = (videoInfo) => {
    if (!videoInfo) return null;

    if (videoInfo.platform === "youtube") {
      return `https://www.youtube.com/embed/${videoInfo.id}?controls=1&modestbranding=1`;
    } else if (videoInfo.platform === "vimeo") {
      return `https://player.vimeo.com/video/${videoInfo.id}`;
    }

    return null;
  };

  const videoInfo = extractVideoId(videoUrl);
  const videoEmbedUrl = getVideoEmbedUrl(videoInfo);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "link",
    "image",
  ];

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await getCourseById(courseId);
      setCourse(response.data);
    } catch (err) {
      setError("Không thể tải thông tin khóa học");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Chỉ hỗ trợ file PDF và PPTX");
        return;
      }
      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert("File không được vượt quá 50MB");
        return;
      }

      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1),
        file: file,
      };
      setUploadedFiles((prev) => [...prev, newFile]);
    });
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-100", "dark:bg-gray-700");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("bg-gray-100", "dark:bg-gray-700");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-100", "dark:bg-gray-700");
    const files = Array.from(e.dataTransfer.files || []);
    const fileEvent = {
      target: {
        files: files,
      },
    };
    handleFileSelect(fileEvent);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      <TeacherHeader />
      <div className="flex">
        <TeacherSidebar />
        <main className="flex-1 bg-slate-50 dark:bg-slate-900 lg:ml-64 pt-16 flex flex-col h-screen pb-28">
          <div className="flex-1 overflow-y-auto p-6 md:px-12 md:py-8">
            <button
              onClick={() => navigate(`/teacher/courses/${courseId}`)}
              className="flex items-center gap-2 mb-3 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">
                Quay lại khóa học {course?.title}
              </span>
            </button>
            <div className="mx-auto flex flex-col gap-6">
              {/* Page Header */}
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight">
                    {isEditMode ? "Chi tiết Bài giảng" : "Tạo Bài giảng mới"}
                  </h1>
                  <p className="text-[#617589] dark:text-gray-400 text-base font-normal">
                    Chỉnh sửa nội dung, media và bài tập cho bài giảng này.
                  </p>
                </div>
                {isEditMode && (
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-semibold">
                      <TrashIcon className="h-[18px] w-[18px]" />
                      Xóa bài giảng
                    </button>
                  </div>
                )}
              </div>

              {/* Main Form Grid */}
              <Form layout="vertical" className="grid grid-cols-1 gap-6">
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#111418] dark:text-gray-200 text-base font-medium">
                      Thuộc khóa học
                    </label>
                    <div className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-[#dbe0e6] dark:border-gray-600">
                      <p className="text-[#111418] dark:text-white font-medium">
                        {course?.title}
                      </p>
                    </div>
                  </div>

                  {/* Title Input */}
                  <Form.Item
                    label={
                      <span className="text-[#111418] dark:text-gray-200 text-base font-medium">
                        Tiêu đề bài giảng
                      </span>
                    }
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tiêu đề bài giảng",
                      },
                      {
                        min: 3,
                        message: "Tiêu đề bài giảng phải có ít nhất 3 ký tự",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tiêu đề bài giảng..."
                      className="h-12 rounded-lg"
                    />
                  </Form.Item>

                  {/* Rich Text Editor */}
                  <Form.Item
                    label={
                      <span className="text-[#111418] dark:text-gray-200 text-base font-medium">
                        Nội dung
                      </span>
                    }
                    name="content"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập nội dung bài giảng",
                      },
                      {
                        min: 3,
                        message: "Nội dung bài giảng phải có ít nhất 3 ký tự",
                      },
                    ]}
                  >
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                      className="h-[300px] mb-12"
                    />
                  </Form.Item>

                  {/* Media Attachments Two Columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Video Section */}
                    <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                          <PlayCircleIcon className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white">
                          Video bài giảng
                        </h3>
                      </div>
                      <Form.Item
                        label="Link Video"
                        labelCol={{
                          className: "text-sm font-medium dark:text-gray-300",
                        }}
                        className="mb-2"
                      >
                        <div className="flex gap-2">
                          <Input
                            placeholder="Dán link YouTube/Vimeo..."
                            size="large"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="flex-1 bg-[#f8f9fa] dark:bg-gray-800 border-[#dbe0e6] dark:border-gray-600"
                          />
                          {videoUrl && (
                            <Button
                              onClick={() => setVideoUrl("")}
                              className="px-4 h-11 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 rounded-lg font-medium text-sm hover:bg-red-100 dark:hover:bg-red-900/40"
                            >
                              Xóa
                            </Button>
                          )}
                        </div>
                      </Form.Item>
                      {/* Video Preview */}
                      {videoEmbedUrl ? (
                        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            src={videoEmbedUrl}
                            title="Video Preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0"
                          ></iframe>
                        </div>
                      ) : (
                        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer border border-dashed border-gray-300 dark:border-gray-600">
                          <div className="relative z-10 bg-white/90 dark:bg-black/70 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                            <PlayCircleIcon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="absolute bottom-3 left-3 z-10 bg-black/70 px-2 py-1 rounded text-xs text-white">
                            Preview Mode
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Document/Slides Section */}
                    <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                          <DocumentTextIcon className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white">
                          Tài liệu / Slide
                        </h3>
                      </div>
                      {/* Drag Drop Zone */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center p-6 bg-[#f8f9fa] dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer min-h-[200px]"
                      >
                        <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                          Kéo thả file PDF vào đây hoặc{" "}
                          <span className="text-primary hover:underline">
                            tải lên
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Hỗ trợ: PDF, PPTX (Max 50MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.pptx"
                          onChange={handleFileSelect}
                          className="!hidden"
                        />
                      </div>
                      {/* File List Items */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                          {uploadedFiles.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-red-600 dark:text-red-400 shrink-0">
                                  <DocumentTextIcon className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {file.size} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quiz Management Section */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6 rounded-xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm shrink-0 text-primary">
                        <ClipboardDocumentListIcon className="h-7 w-7" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold text-[#111418] dark:text-white">
                          Bài tập &amp; Quiz
                        </h3>
                        <p className="text-sm text-[#617589] dark:text-gray-300 max-w-lg">
                          Tạo bộ câu hỏi trắc nghiệm hoặc bài tập tự luận cho
                          bài giảng này để đánh giá học viên.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/teacher/courses/${courseId}/quizzes/create`)
                      }
                      className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-primary border border-primary/30 rounded-lg font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <PlusCircleIcon className="h-5 w-5" />
                      Tạo Quiz mới
                    </button>
                  </div>

                  {/* Notes Section */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-6 rounded-xl">
                    <label className="flex items-center gap-2 text-yellow-800 dark:text-yellow-500 text-sm font-bold mb-2">
                      <DocumentTextIcon className="h-[18px] w-[18px]" />
                      Ghi chú giảng viên (Chỉ hiển thị cho bạn)
                    </label>
                    <textarea
                      className="w-full bg-white dark:bg-gray-800 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-3 text-sm text-[#111418] dark:text-white focus:ring-1 focus:ring-yellow-500 focus:outline-none min-h-[80px]"
                      placeholder="Nhập ghi chú cá nhân về bài giảng này..."
                    ></textarea>
                  </div>
                </div>
              </Form>
            </div>

            {/* Sticky Footer Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 lg:ml-64 border-t border-[#e5e7eb] dark:border-gray-800 bg-white dark:bg-card-dark p-4 px-6 md:px-12 flex justify-between items-center z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="hidden sm:flex flex-col">
                <span className="text-xs text-gray-500">
                  Lần lưu cuối: 10:24 AM
                </span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircleIcon className="h-3 w-3" /> Đã đồng bộ
                </span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-[#111418] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  Hủy
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-2 text-sm">
                  <CheckCircleIcon className="h-5 w-5" />
                  Lưu bài giảng
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
