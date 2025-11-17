import React, { useState, useMemo, useCallback } from 'react';
import {
  Container, Grid, Box, Typography,
  TextField, Select, MenuItem, FormControl,
  InputLabel, Paper, Checkbox, FormControlLabel,
  FormGroup, Card, CardContent, CardMedia,
  Button, Rating, Pagination, useMediaQuery, useTheme,
  Link, AppBar, Toolbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Thêm icon thời lượng
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Thêm icon giá

// --- Dữ liệu Giả định (Mock Data) ---
const mockCourses = [
  { id: 1, title: 'Thuật toán ứng dụng', category: 'Lập Trình', level: 'Beginner', instructor: 'SOICT', price: 0, rating: 4.8, reviews: 120, imageUrl: 'https://daotao.ai/storage/courses/y6D_cover_thuat_toan_ung_dung.jpg', duration: '20 giờ' },
  { id: 2, title: 'Tiếng Nhật 1', category: 'Ngoại Ngữ', level: 'Beginner', instructor: 'JP01', price: 0, rating: 4.5, reviews: 85, imageUrl: 'https://daotao.ai/storage/courses/V2h_cover_japanese_1.jpg', duration: '30 giờ' },
  { id: 3, title: 'Tiếng Nhật 2', category: 'Ngoại Ngữ', level: 'Intermediate', instructor: 'JP01', price: 0, rating: 4.9, reviews: 55, imageUrl: 'https://daotao.ai/storage/courses/j0j_cover_japanese_2.jpg', duration: '30 giờ' },
  { id: 4, title: 'Kỹ năng giao tiếp hiệu quả', category: 'Kỹ Năng Mềm', level: 'Beginner', instructor: 'HR Academy', price: 99.00, rating: 4.7, reviews: 95, imageUrl: 'https://daotao.ai/storage/courses/y6D_cover_thuat_toan_ung_dung.jpg', duration: '15 giờ' }, // Dùng tạm ảnh
  { id: 5, title: 'Phân tích dữ liệu với Excel', category: 'Dữ Liệu', level: 'Intermediate', instructor: 'DataPro', price: 120.00, rating: 4.6, reviews: 60, imageUrl: 'https://daotao.ai/storage/courses/V2h_cover_japanese_1.jpg', duration: '25 giờ' }, // Dùng tạm ảnh
  { id: 6, title: 'Lập trình Python cơ bản', category: 'Lập Trình', level: 'Beginner', instructor: 'CodeLearn', price: 0, rating: 4.4, reviews: 70, imageUrl: 'https://daotao.ai/storage/courses/j0j_cover_japanese_2.jpg', duration: '40 giờ' }, // Dùng tạm ảnh
  { id: 7, title: 'Marketing số từ A-Z', category: 'Kinh Doanh', level: 'Intermediate', instructor: 'BizGrow', price: 150.00, rating: 4.8, reviews: 150, imageUrl: 'https://daotao.ai/storage/courses/y6D_cover_thuat_toan_ung_dung.jpg', duration: '35 giờ' }, // Dùng tạm ảnh
  { id: 8, title: 'Thiết kế đồ họa với Canva', category: 'Thiết Kế', level: 'Beginner', instructor: 'CreativeHub', price: 0, rating: 4.5, reviews: 40, imageUrl: 'https://daotao.ai/storage/courses/V2h_cover_japanese_1.jpg', duration: '10 giờ' }, // Dùng tạm ảnh
  { id: 9, title: 'Quản lý dự án Agile/Scrum', category: 'Kỹ Năng Mềm', level: 'Advanced', instructor: 'PMI', price: 199.00, rating: 4.9, reviews: 110, imageUrl: 'https://daotao.ai/storage/courses/j0j_cover_japanese_2.jpg', duration: '28 giờ' }, // Dùng tạm ảnh
];

const allCategories = Array.from(new Set(mockCourses.map(c => c.category)));
const allLevels = Array.from(new Set(mockCourses.map(c => c.level)));

// Mock data cho trạng thái (status)
const mockStatuses = [
    { label: 'Mở đăng ký', count: 8, value: 'open' },
    { label: 'Sắp bắt đầu', count: 0, value: 'upcoming' },
    { label: 'Đang học', count: 0, value: 'in_progress' },
    { label: 'Đã kết thúc', count: 18, value: 'completed' },
];

// --- Component Header giống trang gốc ---
const CustomHeader = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#fff', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
            <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 'xl', mx: 'auto', width: '100%' }}>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    {/* Placeholder for Logo */}
                    <Box sx={{ width: 32, height: 32, bgcolor: '#007bff', borderRadius: '4px', mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Daotao.ai
                    </Typography>
                </Link>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {['Trang chủ', 'Tin tức', 'Khóa học', 'Chương trình', 'Tổ chức', 'Giảng viên', 'CLB học liệu số'].map((item) => (
                        <Button key={item} color="inherit" sx={{ color: '#555', mx: 1, '&:hover': { color: '#007bff' }, fontWeight: item === 'Khóa học' ? 'bold' : 'normal' }}>
                            {item}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};


// --- Component Banner tìm kiếm ---
const SearchBanner = ({ searchTerm, setSearchTerm, handleSearch }) => (
    <Box sx={{
        bgcolor: '#0056b3', // Màu xanh đậm hơn
        color: '#fff',
        py: { xs: 4, md: 6 },
        px: 2,
        textAlign: 'center',
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
        // Hiệu ứng gradient nhẹ hoặc pattern nếu muốn giống hơn
        background: 'linear-gradient(90deg, rgba(0,86,179,1) 0%, rgba(0,123,255,1) 100%)',
    }}>
        <Container maxWidth="xl">
            <Grid container alignItems="center" spacing={4}>
                <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Khóa học
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <TextField
                        fullWidth
                        placeholder="Tìm kiếm khóa học, tổ chức đào tạo và danh mục"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}
                        sx={{
                            bgcolor: '#fff',
                            borderRadius: '8px',
                            '.MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                pr: 0, // Bỏ padding bên phải để nút tìm kiếm sát
                            },
                            '.MuiInputBase-input': {
                                py: '12.5px', // Căn chỉnh chiều cao input
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <Button 
                                    variant="contained" 
                                    onClick={handleSearch} 
                                    sx={{ 
                                        bgcolor: '#007bff', 
                                        color: '#fff', 
                                        borderRadius: '0 8px 8px 0', 
                                        height: '56px', // Chiều cao bằng input
                                        minWidth: '60px', // Đảm bảo đủ rộng cho icon
                                        '&:hover': { bgcolor: '#006edc' }
                                    }}
                                >
                                    <SearchIcon />
                                </Button>
                            ),
                            startAdornment: ( // Icon tìm kiếm bên trái giống trong ảnh
                                <SearchIcon color="action" sx={{ mr: 1, color: '#999' }} />
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    </Box>
);

// --- Component Card Khóa học ---
const CourseCard = ({ course }) => (
  <Card 
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      boxShadow: 1, // Shadow nhẹ
      transition: '0.3s', 
      borderRadius: '12px', // Bo góc nhiều hơn
      '&:hover': { boxShadow: 4 },
      overflow: 'hidden' // Đảm bảo ảnh bo góc theo card
    }}
  >
    <CardMedia
      component="img"
      height="180"
      image={course.imageUrl}
      alt={course.title}
      sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} // Bo góc ảnh
    />
    <CardContent sx={{ flexGrow: 1, p: 2 }}>
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
            bgcolor: '#e0f7fa', // Nền xanh nhạt cho tag
            color: '#007bff', 
            px: 1, py: 0.5, 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            mb: 1, 
            display: 'inline-block' 
        }}>
        {course.category}
      </Typography>
      <Typography 
        gutterBottom 
        variant="subtitle1" 
        component="div" 
        sx={{ 
            fontWeight: 'bold', 
            minHeight: '50px', 
            display: '-webkit-box', 
            overflow: 'hidden', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical' 
        }}
      >
        {course.title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <SchoolIcon sx={{ mr: 0.5, fontSize: '1rem', color: '#666' }} /> {course.instructor}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 0.5, fontSize: '1rem', color: '#666' }} /> {course.duration}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          {course.price === 0 ? 'Miễn phí' : `$${course.price.toFixed(2)}`}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating 
                name={`rating-${course.id}`} 
                value={course.rating} 
                precision={0.1} 
                readOnly 
                size="small"
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                ({course.reviews})
            </Typography>
        </Box>
      </Box>
      
    </CardContent>
    <Box sx={{ p: 2, pt: 0 }}>
        <Button 
            variant="outlined" 
            fullWidth 
            sx={{ 
                borderRadius: '8px', 
                borderColor: '#007bff', 
                color: '#007bff', 
                '&:hover': { 
                    bgcolor: '#e3f2fd', 
                    borderColor: '#007bff' 
                } 
            }}
        >
            Xem khóa học
        </Button>
    </Box>
  </Card>
);

// --- Component Bộ lọc (Sidebar) ---
const CourseFilter = ({ filters, setFilters, onApply }) => {
    
    const handleCategoryChange = useCallback((category) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            categories: prevFilters.categories.includes(category)
                ? prevFilters.categories.filter(c => c !== category)
                : [...prevFilters.categories, category],
        }));
    }, [setFilters]);

    const handleLevelChange = useCallback((level) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            levels: prevFilters.levels.includes(level)
                ? prevFilters.levels.filter(l => l !== level)
                : [...prevFilters.levels, level],
        }));
    }, [setFilters]);

    const handleStatusChange = useCallback((statusValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            statuses: prevFilters.statuses.includes(statusValue)
                ? prevFilters.statuses.filter(s => s !== statusValue)
                : [...prevFilters.statuses, statusValue],
        }));
    }, [setFilters]);

    const handleReset = useCallback(() => {
        setFilters({ categories: [], levels: [], statuses: [] });
        onApply(); // Áp dụng lại sau khi reset
    }, [setFilters, onApply]);

    return (
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px' }}> {/* elevation 0, border */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    Lọc danh sách khóa học
                </Typography>
                {/* Nút xóa bộ lọc sẽ không hiển thị trên giao diện này */}
                {/* <Button size="small" variant="outlined" onClick={handleReset}>
                    Xóa Bộ Lọc
                </Button> */}
            </Box>

            {/* --- Lọc theo Trạng thái --- */}
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                Trạng thái
            </Typography>
            <FormGroup>
                {mockStatuses.map(status => (
                    <FormControlLabel
                        key={status.value}
                        control={
                            <Checkbox 
                                checked={filters.statuses.includes(status.value)}
                                onChange={() => handleStatusChange(status.value)}
                                size="small"
                            />
                        }
                        label={
                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                {status.label} ({status.count})
                            </Typography>
                        }
                    />
                ))}
            </FormGroup>

            {/* --- Lọc theo Lĩnh vực (Danh mục) --- */}
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                Lĩnh vực
            </Typography>
            <FormGroup sx={{ maxHeight: 200, overflowY: 'auto' }}>
                {allCategories.map(category => (
                    <FormControlLabel
                        key={category}
                        control={
                            <Checkbox 
                                checked={filters.categories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                size="small"
                            />
                        }
                        label={
                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                {category}
                            </Typography>
                        }
                    />
                ))}
            </FormGroup>

            {/* --- Lọc theo Trình độ (Cấp độ) --- */}
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                Trình độ
            </Typography>
            <FormGroup>
                {allLevels.map(level => (
                    <FormControlLabel
                        key={level}
                        control={
                            <Checkbox 
                                checked={filters.levels.includes(level)}
                                onChange={() => handleLevelChange(level)}
                                size="small"
                            />
                        }
                        label={
                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                {level}
                            </Typography>
                        }
                    />
                ))}
            </FormGroup>
            
            {/* Nút Áp dụng không rõ ràng trong giao diện gốc, có thể áp dụng tự động */}
            {/* <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={onApply}>
                Áp Dụng Bộ Lọc
            </Button> */}
        </Paper>
    );
};


// --- Component Trang Chính ---
const CoursesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // --- State cho Phân trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // --- State cho Tìm kiếm và Sắp xếp ---
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState(''); // Để kích hoạt tìm kiếm khi nhấn nút
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'rating' | 'price_asc'

  // --- State cho Bộ lọc (Filter) ---
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    statuses: [] // Thêm trạng thái vào bộ lọc
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  // Kích hoạt tìm kiếm khi nhấn nút hoặc enter
  const handleSearchTrigger = useCallback(() => {
    setCurrentSearchTerm(searchTerm);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm mới
  }, [searchTerm]);

  // Apply filters khi có thay đổi trong filters state (nếu muốn tự động apply)
  // Hoặc chỉ khi nhấn nút "Áp dụng Bộ lọc"
  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset về trang 1 khi lọc
  }, [filters]);


  // --- Logic Xử lý Dữ liệu ---

  // Sử dụng useMemo để tối ưu hóa việc tính toán dữ liệu
  const { displayedCourses, totalPages, filteredCoursesCount } = useMemo(() => {
    // 1. Lọc
    const filtered = mockCourses.filter(course => {
      // Tìm kiếm theo từ khóa
      const termMatch = course.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
      
      // Lọc theo danh mục
      const categoryMatch = appliedFilters.categories.length === 0 || appliedFilters.categories.includes(course.category);
      
      // Lọc theo cấp độ
      const levelMatch = appliedFilters.levels.length === 0 || appliedFilters.levels.includes(course.level);

      // Lọc theo trạng thái (cần có logic xử lý trạng thái thực tế cho mock data)
      // Ví dụ: chỉ hiện các khóa "Miễn phí" nếu lọc theo "Mở đăng ký" và giá = 0
      const statusMatch = appliedFilters.statuses.length === 0 || 
                          (appliedFilters.statuses.includes('open') && course.price === 0) ||
                          (appliedFilters.statuses.includes('completed') && course.id % 2 === 0); // Ví dụ tạm
    // ... thêm các trạng thái khác nếu có logic
      return termMatch && categoryMatch && levelMatch && statusMatch;
    });

    // 2. Sắp xếp
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id - a.id; // Giả sử ID cao hơn là mới hơn
        case 'rating':
          return b.rating - a.rating;
        case 'price_asc':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    // 3. Phân trang
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const current = sorted.slice(indexOfFirstCourse, indexOfLastCourse);

    const total = Math.ceil(sorted.length / coursesPerPage);
    
    return {
        displayedCourses: current,
        totalPages: total,
        filteredCoursesCount: filtered.length
    };
  }, [currentSearchTerm, appliedFilters, sortBy, currentPage, coursesPerPage]);


  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
  }, []);

  // Update applied filters whenever filters state changes
  // This will make filters apply automatically without an explicit "Apply" button
  React.useEffect(() => {
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset page on filter change
  }, [filters]);

  return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh' }}>
          <CustomHeader />
          <SearchBanner 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            handleSearch={handleSearchTrigger} 
          />
          
          <Container maxWidth="xl" sx={{ py: 4 }}>
            
            {/* Grid container chính - Đảm bảo hai cột nằm trên cùng một hàng */}
            <Grid container spacing={4}>
              
              {/* --- Cột Bộ lọc (Sidebar) --- */}
              {/* Giữ nguyên md=3 */}
              <Grid item xs={12} md={3}>
                <CourseFilter 
                  filters={filters} 
                  setFilters={setFilters} 
                  onApply={handleApplyFilters}
                />
              </Grid>
              
              {/* --- Cột Nội dung Chính --- */}
              {/* Giữ nguyên md=9. Đã loại bỏ flexGrow để tránh can thiệp */}
              <Grid item xs={12} md={9}>
                
                {/* --- Thanh Sắp xếp (Top Bar) --- */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center', 
                    mb: 3, 
                    px: 2, 
                    py: 1.5, 
                    bgcolor: '#fff', 
                    borderRadius: '8px', 
                    boxShadow: 1 
                }}>
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel id="sort-by-label">Sắp xếp theo</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            value={sortBy}
                            label="Sắp xếp theo"
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <MenuItem value="newest">Mới nhất</MenuItem>
                            <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                            <MenuItem value="price_asc">Giá (Thấp đến Cao)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                
                {/* --- DANH SÁCH KHÓA HỌC (Sử dụng Flexbox để cố định chiều rộng) --- */}
                {displayedCourses.length > 0 ? (
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 24, 
                        // Sắp xếp các thẻ sang trái trên desktop
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        // Bù lại padding/spacing của Grid container bên ngoài
                        m: -1
                    }}>
                      {displayedCourses.map(course => (
                        <Box 
                            key={course.id}
                            sx={{
                                // Thiết lập chiều rộng cố định và cho phép tự động xuống dòng
                                flex: '1 1 280px', 
                                minWidth: 280, 
                                maxWidth: 300,
                                // Bù lại m: -1 ở Box cha
                                m: 1, 
                                boxSizing: 'border-box'
                            }}
                        >
                          <CourseCard course={course} />
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Paper sx={{ p: 4, textAlign: 'center', boxShadow: 1, borderRadius: '8px' }}>
                        <Typography variant="h6" color="text.secondary">
                            Không tìm thấy khóa học nào phù hợp với tiêu chí của bạn.
                        </Typography>
                    </Paper>
                  )}
    
                {/* --- Phân trang --- */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
    
              </Grid>
            </Grid>
          </Container>
        </Box>
    );
};

export default CoursesPage;