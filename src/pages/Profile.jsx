import React from 'react';
import { Container, Grid, Box, Typography, Paper, Button } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfileCard from '../components/ProfileCard';
import CourseList from '../components/CourseList';

// Dữ liệu mẫu để demo. Thay thế bằng API thực khi tích hợp backend
const mockProfile = {
  name: 'Nguyễn Văn A',
  dob: '2000-04-15',
  email: 'nguyenvana@example.com',
  phone: '0123 456 789',
  avatarUrl: '',
  studentId: '20225078'
};

const mockEnrolled = [
  { id: 1, title: 'Lập trình Web nâng cao', code: 'IT4409', instructor: 'Dr. Trần B', status: 'Đang học' },
  { id: 2, title: 'Cơ sở dữ liệu', code: 'IT3301', instructor: 'ThS. Lê C', status: 'Hoàn thành' },
  { id: 3, title: 'Công nghệ phần mềm', code: 'IT4060', instructor: 'Dr. Phạm D', status: 'Chưa bắt đầu' },
];

const mockTeaching = [
  { id: 11, title: 'Giải thuật và cấu trúc dữ liệu', code: 'IT2102', instructor: 'Nguyễn Văn A', status: 'Đang giảng dạy' },
];

const Profile = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  // Vai trò người dùng: 'student' hoặc 'teacher'. Mặc định là student
  const role = params.get('role') || 'student';

  // Trong ứng dụng thực tế, lấy dữ liệu người dùng qua API. Ở đây dùng dữ liệu mẫu
  const profile = mockProfile;
  const enrolled = mockEnrolled;
  const teaching = mockTeaching;

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Phần header - Full width với nội dung giới hạn độ rộng */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', mb: 3 }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Hồ sơ cá nhân</Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={RouterLink}
                to="/"
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                size="small"
              >
                Trang đăng nhập
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Phần nội dung chính - Full width với padding */}
      <Container maxWidth="xl" sx={{ pb: 4 }}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <ProfileCard profile={profile} />
          </Grid>

          <Grid item xs={12}>
            <CourseList title="Khóa học đã tham gia" courses={enrolled} />
          </Grid>

          {role === 'teacher' && (
            <Grid item xs={12}>
              <CourseList title="Khóa học đang giảng dạy" courses={teaching} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
