import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CourseDetail = () => {
  const { id } = useParams();

  // For now this page is a simple placeholder. Integrate with API to fetch full course data.
  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Chi tiết khóa học</Typography>
          <Button component={RouterLink} to="/my-courses" startIcon={<ArrowBackIcon />}>
            Trở về
          </Button>
        </Box>

        <Typography variant="h6">ID khóa học: {id}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Trang chi tiết tạm thời. Kết nối API để hiển thị thông tin chi tiết (mô tả, lịch học, bài tập, v.v.).
        </Typography>
      </Container>
    </Box>
  );
};

export default CourseDetail;
