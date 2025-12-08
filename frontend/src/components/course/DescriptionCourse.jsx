export default function DescriptionCourse() {
    return (
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
    );
}
