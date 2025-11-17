import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  Tabs,
  Tab,
  Chip,
  Paper,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

// Dữ liệu mẫu cho trang Khóa học của tôi
const mockCourses = [
  {
    id: 1,
    image: '',
    title: 'Lập trình Web nâng cao',
    className: 'Lớp A1',
    code: 'IT4409',
    start: '01/09/2025',
    end: '31/12/2025',
    instructor: 'Dr. Trần B',
    status: 'Đang học'
  },
  {
    id: 2,
    image: '',
    title: 'Cơ sở dữ liệu',
    className: 'Lớp B2',
    code: 'IT3301',
    start: '01/02/2025',
    end: '30/05/2025',
    instructor: 'ThS. Lê C',
    status: 'Hoàn thành'
  },
  {
    id: 3,
    image: '',
    title: 'Công nghệ phần mềm',
    className: 'Lớp C3',
    code: 'IT4060',
    start: '15/03/2025',
    end: '15/06/2025',
    instructor: 'Dr. Phạm D',
    status: 'Đang học'
  },
  {
    id: 4,
    image: '',
    title: 'Trí tuệ nhân tạo',
    className: 'Lớp D4',
    code: 'IT4501',
    start: '01/10/2025',
    end: '31/12/2025',
    instructor: 'TS. Nguyễn E',
    status: 'Chưa bắt đầu'
  }
];

const MyCourses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all');

  // Lọc khóa học
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterTab === 'all') return matchesSearch;
    if (filterTab === 'active') return matchesSearch && course.status === 'Đang học';
    if (filterTab === 'completed') return matchesSearch && course.status === 'Hoàn thành';
    if (filterTab === 'upcoming') return matchesSearch && course.status === 'Chưa bắt đầu';
    
    return matchesSearch;
  });

  // Thống kê
  const totalCourses = mockCourses.length;
  const activeCourses = mockCourses.filter(c => c.status === 'Đang học').length;
  const completedCourses = mockCourses.filter(c => c.status === 'Hoàn thành').length;
  const upcomingCourses = mockCourses.filter(c => c.status === 'Chưa bắt đầu').length;

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header với gradient background */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 3,
          mb: -3
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            {/* Tiêu đề và thống kê */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap', flex: 1 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25 }}>
                  Khóa học của tôi
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.875rem' }}>
                  Quản lý và theo dõi tiến độ học tập
                </Typography>
              </Box>

              {/* Thống kê inline */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white !important', lineHeight: 1 }}>
                    {totalCourses}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, color: 'white !important', fontSize: '0.75rem' }}>
                    Tổng
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white !important', lineHeight: 1 }}>
                    {activeCourses}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, color: 'white !important', fontSize: '0.75rem' }}>
                    Đang học
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white !important', lineHeight: 1 }}>
                    {completedCourses}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, color: 'white !important', fontSize: '0.75rem' }}>
                    Hoàn thành
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white !important', lineHeight: 1 }}>
                    {upcomingCourses}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, color: 'white !important', fontSize: '0.75rem' }}>
                    Sắp tới
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Nút Hồ sơ
            <Button
              component={RouterLink}
              to="/profile"
              variant="contained"
              size="small"
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.3)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white'
                }
              }}
              startIcon={<AccountCircleIcon sx={{ color: 'white' }} />}
            >
              Hồ sơ
            </Button> */}
          </Box>
        </Container>
      </Box>

      {/* Phần nội dung chính */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Tìm kiếm và bộ lọc */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 3,
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm khóa học, mã môn, giảng viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ 
                flex: 1,
                minWidth: 250,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Tabs filter */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={filterTab}
              onChange={(e, newValue) => setFilterTab(newValue)}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  minHeight: 48,
                }
              }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Tất cả
                    <Chip 
                      label={totalCourses} 
                      size="small" 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem',
                        bgcolor: filterTab === 'all' ? 'primary.main' : 'grey.300',
                        color: filterTab === 'all' ? 'white' : 'grey.700'
                      }} 
                    />
                  </Box>
                } 
                value="all" 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Đang học
                    <Chip 
                      label={activeCourses} 
                      size="small" 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem',
                        bgcolor: filterTab === 'active' ? 'primary.main' : 'grey.300',
                        color: filterTab === 'active' ? 'white' : 'grey.700'
                      }} 
                    />
                  </Box>
                } 
                value="active" 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Hoàn thành
                    <Chip 
                      label={completedCourses} 
                      size="small" 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem',
                        bgcolor: filterTab === 'completed' ? 'primary.main' : 'grey.300',
                        color: filterTab === 'completed' ? 'white' : 'grey.700'
                      }} 
                    />
                  </Box>
                } 
                value="completed" 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Sắp tới
                    <Chip 
                      label={upcomingCourses} 
                      size="small" 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem',
                        bgcolor: filterTab === 'upcoming' ? 'primary.main' : 'grey.300',
                        color: filterTab === 'upcoming' ? 'white' : 'grey.700'
                      }} 
                    />
                  </Box>
                } 
                value="upcoming" 
              />
            </Tabs>
          </Box>
        </Paper>

        {/* Danh sách khóa học */}
        {filteredCourses.length === 0 ? (
          <Paper 
            elevation={2} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 3
            }}
          >
            <SchoolIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Không tìm thấy khóa học nào
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredCourses.map(course => (
              <Grid item xs={12} sm={6} lg={4} key={course.id}>
                <CourseCard 
                  course={course}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  onSettingsClick={(c) => console.log('Open settings for', c.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MyCourses;
