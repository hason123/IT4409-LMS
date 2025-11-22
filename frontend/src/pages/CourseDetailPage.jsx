import React from 'react';
import Header from '../components/Header';

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#333333] dark:text-gray-200">
      <Header />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <a className="text-primary text-sm font-medium" href="#">Trang chủ</a>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">/</span>
            <a className="text-primary text-sm font-medium" href="#">Lập trình</a>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">/</span>
            <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">The Complete Web Developer Course 3.0</span>
          </div>
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content (Left Column) */}
            <div className="col-span-12 lg:col-span-8">
              <div className="flex flex-col gap-4 mb-6">
                <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">The Complete Web Developer Course 3.0</p>
                <p className="text-gray-600 dark:text-gray-300 text-lg">Học Lập trình Web bằng cách xây dựng 25 trang web và ứng dụng di động bằng HTML, CSS, Javascript, PHP, Python, MySQL và hơn thế nữa!</p>
                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300 mt-2">
                  <div className="flex items-center gap-2">
                    <img alt="Avatar giảng viên Rob Percival" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhE6xdMrjAf3wdfHim4XGXWu3OqQvnxB4867xflSLd5V9-yT4yG-ZMEZiwrIirdOFJzHqSp2-MTT68oHt7LaXzL9ujl-dzXRiw7I9NOiXuUE1L9s1P3Kc3bolXXCDB6v5XhXbwdprTYw1DyT6YlY6D1-uN8gLHOsrNKkLNN40ldPvbDCyTUCXUnV7mBp3VNsJMOdl5pPtgJCCnpF1l9a9SFvc9W47I9P5dSub8YrS3UvjRb7xT_IEtbW2JljPyy3QAivITahhBpb4" />
                    <span>Giảng viên: <span className="font-semibold text-[#111418] dark:text-white">Bình Trần</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-yellow-500">4.7</span>
                    <div className="flex text-yellow-500">
                      <span className="material-symbols-outlined !text-base" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                      <span className="material-symbols-outlined !text-base" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                      <span className="material-symbols-outlined !text-base" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                      <span className="material-symbols-outlined !text-base" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                      <span className="material-symbols-outlined !text-base" style={{ fontVariationSettings: '"FILL" 1' }}>star_half</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">(12,455 đánh giá)</span>
                  </div>
                </div>
                <button class="w-full flex min-w-[84px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-transparent text-primary dark:text-primary border-2 border-primary text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/10 transition-colors">
                    <span class="truncate">Đăng ký học</span>
                </button>
              </div>
              {/* Tabs */}
              <div className="w-full">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav aria-label="Tabs" className="flex space-x-6 -mb-px">
                    <a className="shrink-0 border-b-2 border-primary px-1 py-4 text-base font-semibold text-primary cursor-pointer">Mô tả</a>
                    <a className="shrink-0 border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">Chương trình học</a>
                    <a className="shrink-0 border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">Giảng viên</a>
                    <a className="shrink-0 border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">Đánh giá</a>
                  </nav>
                </div>
                <div className="py-6 space-y-8">
                  {/* Description Panel */}
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <h3 className="text-xl font-bold text-[#111418] dark:text-white">Bạn sẽ học được gì</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 list-none p-0">
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-green-500 mt-1">check_circle</span><span>Xây dựng các trang web và ứng dụng web hoạt động hiệu quả</span></li>
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-green-500 mt-1">check_circle</span><span>Sử dụng HTML5, CSS3, Javascript, và jQuery</span></li>
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-green-500 mt-1">check_circle</span><span>Tích hợp API để kết nối với các trang của bên thứ ba</span></li>
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-green-500 mt-1">check_circle</span><span>Làm chủ Python và các framework web phổ biến</span></li>
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-green-500 mt-1">check_circle</span><span>Sử dụng MySQL để quản lý cơ sở dữ liệu</span></li>
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-green-500 mt-1">check_circle</span><span>Trở thành một lập trình viên full-stack chuyên nghiệp</span></li>
                    </ul>
                    <h3 className="text-xl font-bold text-[#111418] dark:text-white pt-4">Yêu cầu</h3>
                    <ul className="space-y-2 list-none p-0">
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-gray-500 mt-1">info</span><span>Không yêu cầu kiến thức lập trình trước.</span></li>
                      <li className="flex items-start gap-3"><span className="material-symbols-outlined text-gray-500 mt-1">info</span><span>Máy tính cá nhân với kết nối internet.</span></li>
                    </ul>
                  </div>
                  {/* Syllabus Panel (Accordion) */}
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
                      {/* Accordion Item 2 */}
                      <details className="group bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <summary className="flex cursor-pointer items-center justify-between list-none">
                          <span className="font-semibold text-[#111418] dark:text-white">Chương 2: HTML5 Nâng cao</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">8 bài giảng • 1 giờ 25 phút</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                          </div>
                        </summary>
                        <div className="mt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2 text-primary"> <span className="material-symbols-outlined text-base">play_circle</span><span><u>Xem trước: Thẻ Form và Input</u></span></div>
                            <span>15:00</span>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar (Right Column) */}
            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Course Info List */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-4">Thông tin khóa học</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gray-500 dark:text-gray-400">schedule</span><span>Thời lượng: 30 giờ video</span></li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gray-500 dark:text-gray-400">slideshow</span><span>Số bài giảng: 215</span></li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gray-500 dark:text-gray-400">bar_chart</span><span>Cấp độ: Mọi cấp độ</span></li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gray-500 dark:text-gray-400">language</span><span>Ngôn ngữ: Tiếng Việt</span></li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-gray-500 dark:text-gray-400">workspace_premium</span><span>Có chứng chỉ hoàn thành</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
