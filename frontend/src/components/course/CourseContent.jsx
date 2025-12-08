export default function CourseContent() {
    return (
    <div className="space-y-4">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">Nội dung khóa học</h2>
        <div className="space-y-3">
            {/* Accordion Item 1 */}
            <details className="group bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between list-none">
                    <span className="font-semibold text-[#111418] dark:text-white">Chương 1: Giới thiệu và Bắt đầu</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">4 bài giảng • 15 phút</span>
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                    </div>
                </summary>
                <div className="mt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2"> <span className="material-symbols-outlined text-base">play_circle</span><span>Chào mừng đến với khóa học</span></div>
                        <span>02:30</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2"> <span className="material-symbols-outlined text-base">play_circle</span><span>Cài đặt môi trường</span></div>
                        <span>08:15</span>
                    </div>
                </div>
            </details>
        </div>
    </div>);
}