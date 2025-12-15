import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseContent() {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleAddLecture = () => {
        navigate(`/teacher/courses/${id}/lectures/create`);
    };

    const handleEditLecture = (lectureId) => {
        if (user?.role === 'TEACHER') {
            navigate(`/teacher/courses/${id}/lectures/${lectureId}`);
        }
    };

    const handleQuizClick = (quizId) => {
        if (user?.role === 'TEACHER') {
            navigate(`/teacher/courses/${id}/quizzes/${quizId}`);
        } else {
            navigate(`/quizzes/${quizId}/attempt`);
        }
    };

    return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">Nội dung khóa học</h2>
            {user?.role === 'TEACHER' && (
                <button 
                    onClick={handleAddLecture}
                    className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
                >
                    <PlusIcon className="h-4 w-4" />
                    <span>Thêm bài giảng mới</span>
                </button>
            )}
        </div>
        <div className="space-y-3">
            {/* Accordion Item 1 */}
            <details className="group bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700" open>
                <summary className="flex cursor-pointer items-center justify-between list-none">
                    <span className="font-semibold text-[#111418] dark:text-white">Chương 1: Giới thiệu và Bắt đầu</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">4 bài giảng • 15 phút</span>
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </div>
                </summary>
                <div className="mt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div 
                        onClick={() => handleEditLecture(1)}
                        className={`flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 ${user?.role === 'TEACHER' ? 'cursor-pointer hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded transition-colors' : ''}`}
                    >
                        <div className="flex items-center gap-2"> <span className="material-symbols-outlined text-base">play_circle</span><span>Chào mừng đến với khóa học</span></div>
                        <span>02:30</span>
                    </div>
                    <div 
                        onClick={() => handleEditLecture(2)}
                        className={`flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 ${user?.role === 'TEACHER' ? 'cursor-pointer hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded transition-colors' : ''}`}
                    >
                        <div className="flex items-center gap-2"> <span className="material-symbols-outlined text-base">play_circle</span><span>Cài đặt môi trường</span></div>
                        <span>08:15</span>
                    </div>
                    <div 
                        onClick={() => handleQuizClick(1)}
                        className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded transition-colors"
                    >
                        <div className="flex items-center gap-2"> 
                            <span className="material-symbols-outlined text-base text-primary">quiz</span>
                            <span>Kiểm tra kiến thức chương 1</span>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">15 phút</span>
                    </div>
                </div>
            </details>
        </div>
    </div>);
}