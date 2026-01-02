import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { getChaptersByCourseId, deleteChapter } from "../../api/chapter";
import { Spin, Alert, Dropdown, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function CourseContent() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteChapterId, setDeleteChapterId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchChapters();
  }, [id]);

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const response = await getChaptersByCourseId(id);
      setChapters(response.data || response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLecture = () => {
    navigate(`/teacher/courses/${id}/lectures/create`);
  };

  const handleAddChapter = () => {
    navigate(`/teacher/courses/${id}/chapters/create`);
  };

  const handleEditLecture = (lectureId) => {
    if (user?.role === "TEACHER") {
      navigate(`/teacher/courses/${id}/lectures/${lectureId}`);
    }
  };

  const handleQuizClick = (quizId) => {
    if (user?.role === "TEACHER") {
      navigate(`/teacher/courses/${id}/quizzes/${quizId}`);
    } else {
      navigate(`/quizzes/${quizId}/attempt`);
    }
  };

  const handleDeleteChapter = (chapterId) => {
    setDeleteChapterId(chapterId);
  };

  const confirmDeleteChapter = async () => {
    try {
      setDeleting(true);
      await deleteChapter(deleteChapterId);
      message.success("Xóa chương thành công");
      setDeleteChapterId(null);
      fetchChapters();
    } catch (err) {
      message.error(err.message || "Lỗi khi xóa chương");
    } finally {
      setDeleting(false);
    }
  };

  const getChapterMenuItems = (chapterId) => [
    {
      key: "add-lecture",
      label: "Thêm bài giảng",
      onClick: () => {
        navigate(`/teacher/courses/${id}/chapters/${chapterId}/lectures/create`);
      },
    },
    {
      key: "add-quiz",
      label: "Thêm bài kiểm tra",
      onClick: () => {
        navigate(`/teacher/courses/${id}/chapters/${chapterId}/quizzes/create`);
      },
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Xóa chương",
      danger: true,
      onClick: () => {
        handleDeleteChapter(chapterId);
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">
          Nội dung khóa học
        </h2>
        {user?.role === "TEACHER" && (
          <div className="flex gap-2">
            <button
              onClick={handleAddChapter}
              className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Thêm chương</span>
            </button>
            <button
              onClick={handleAddLecture}
              className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Thêm bài giảng</span>
            </button>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {chapters && chapters.length > 0 ? (
          chapters.map((chapter) => (
            <details
              key={chapter.id}
              className="group bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <span className="font-semibold text-[#111418] dark:text-white">
                  {chapter.title}
                </span>
                <div className="flex items-center gap-4">
                  {user?.role === "TEACHER" && (
                    <Dropdown
                      menu={{ items: getChapterMenuItems(chapter.id) }}
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </Dropdown>
                  )}
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="mt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Hiện tại chưa có bài giảng trong chương này
                </p>
              </div>
            </details>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Chưa có chương nào được tạo
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        title="Xác nhận xóa chương"
        open={deleteChapterId !== null}
        onCancel={() => setDeleteChapterId(null)}
        footer={null}
        centered
      >
        <p className="mb-6">
          Bạn có chắc chắn muốn xóa chương này? Hành động này không thể hoàn
          tác.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setDeleteChapterId(null)}
            className="px-6 py-2 rounded-lg bg-slate-100 text-slate-700"
            disabled={deleting}
          >
            Hủy
          </button>
          <button
            onClick={confirmDeleteChapter}
            className="px-6 py-2 rounded-lg bg-red-600 text-white flex items-center gap-2"
            disabled={deleting}
          >
            {deleting ? <Spin size="small" /> : "Xóa"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
