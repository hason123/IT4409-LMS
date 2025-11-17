import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Chip,
  TextField,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ProfileCard from '../components/ProfileCard';

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

const mockCertificates = [
  { 
    id: 1, 
    name: 'Chứng chỉ Lập trình Web nâng cao', 
    issuer: 'HUST', 
    date: '2024-12-15',
    course: 'IT4409'
  },
  { 
    id: 2, 
    name: 'Chứng chỉ Cơ sở dữ liệu', 
    issuer: 'HUST', 
    date: '2024-05-20',
    course: 'IT3301'
  },
  { 
    id: 3, 
    name: 'Chứng chỉ Công nghệ phần mềm', 
    issuer: 'HUST', 
    date: '2024-06-10',
    course: 'IT4060'
  },
];

const Profile = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  // Vai trò người dùng: 'student' hoặc 'teacher'. Mặc định là student
  const role = params.get('role') || 'student';

  // Trong ứng dụng thực tế, lấy dữ liệu người dùng qua API. Ở đây dùng dữ liệu mẫu
  const [profile, setProfile] = useState(mockProfile);
  const enrolled = mockEnrolled;
  const certificates = mockCertificates;

  // State cho mô tả bản thân
  const [bio, setBio] = useState('Tôi là sinh viên ngành Công nghệ thông tin, đam mê lập trình và phát triển phần mềm. Tôi luôn cố gắng học hỏi và nâng cao kỹ năng của mình mỗi ngày.');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioEdit, setBioEdit] = useState(bio);

  // State cho chỉnh sửa thông tin cá nhân
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...mockProfile });

  const handleEditProfile = () => {
    setEditedProfile({ ...profile });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setProfile({ ...editedProfile });
    setIsEditingProfile(false);
    // Ở đây có thể gọi API để lưu thông tin
    console.log('Saving profile:', editedProfile);
  };

  const handleCancelProfile = () => {
    setEditedProfile({ ...profile });
    setIsEditingProfile(false);
  };

  const handleProfileChange = (updatedProfile) => {
    setEditedProfile(updatedProfile);
  };

  const handleSaveBio = () => {
    setBio(bioEdit);
    setIsEditingBio(false);
  };

  const handleCancelBio = () => {
    setBioEdit(bio);
    setIsEditingBio(false);
  };

  // Thống kê khóa học
  const enrolledCount = enrolled.length;
  const completedCount = enrolled.filter(c => c.status === 'Hoàn thành').length;
  const inProgressCount = enrolled.filter(c => c.status === 'Đang học').length;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden', width: '100%' }}>
      {/* Header với gradient background */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 3,
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
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
                  Hồ sơ cá nhân
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.875rem' }}>
                  Quản lý thông tin và khóa học của bạn
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
                    {enrolledCount}
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
                    {inProgressCount}
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
                    {completedCount}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, color: 'white !important', fontSize: '0.75rem' }}>
                    Hoàn thành
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <AccountCircleIcon sx={{ fontSize: 18, color: 'white !important' }} />
                  <Typography variant="caption" sx={{ opacity: 0.9, color: 'white !important', fontSize: '0.75rem', fontWeight: 600 }}>
                    {role === 'teacher' ? 'Giảng viên' : 'Sinh viên'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Nút Khóa học của tôi
            <Button
              component={RouterLink}
              to="/my-courses"
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
                },
              }}
              startIcon={<SchoolIcon sx={{ color: 'white' }} />}
            >
              Khóa học của tôi
            </Button> */}
          </Box>
        </Container>
      </Box>

      {/* Phần nội dung chính */}
      <Container maxWidth="xl" sx={{ pb: 2, pt: 2, px: { xs: 2, sm: 3, md: 4 }, width: '100%', boxSizing: 'border-box' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'flex-start',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Khối thông tin cá nhân */}
          <Box sx={{ 
            width: { xs: '100%', md: '33.333%' },
            flexShrink: 0,
            boxSizing: 'border-box'
          }}>
            <ProfileCard 
              profile={profile}
              isEditing={isEditingProfile}
              onEdit={handleEditProfile}
              onSave={handleSaveProfile}
              onCancel={handleCancelProfile}
              editedProfile={editedProfile}
              onProfileChange={handleProfileChange}
            />
          </Box>

          {/* 2 khối bên phải */}
          <Box sx={{ 
            flex: { md: '1 1 0%' },
            width: { xs: '100%', md: 'auto' },
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            boxSizing: 'border-box'
          }}>
              {/* Khối mô tả bản thân */}
              <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: 4,
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 2,
                    pb: 2,
                    borderBottom: 2,
                    borderColor: 'divider'
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Mô tả bản thân
                    </Typography>
                    {!isEditingBio ? (
                      <IconButton
                        size="small"
                        onClick={() => setIsEditingBio(true)}
                        sx={{ 
                          color: 'primary.contrastText',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={handleSaveBio}
                          sx={{ 
                            color: 'success.main',
                            '&:hover': {
                              bgcolor: 'success.light',
                            }
                          }}
                        >
                          <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleCancelBio}
                          sx={{ 
                            color: 'error.main',
                            '&:hover': {
                              bgcolor: 'error.light',
                            }
                          }}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  {isEditingBio ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      value={bioEdit}
                      onChange={(e) => setBioEdit(e.target.value)}
                      placeholder="Nhập mô tả về bản thân..."
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  ) : (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {bio || 'Chưa có mô tả về bản thân. Nhấn vào biểu tượng chỉnh sửa để thêm mô tả.'}
                    </Typography>
                  )}
                </Paper>

              {/* Khối danh sách chứng chỉ */}
              <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: 4,
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 3, 
                    pb: 2, 
                    borderBottom: 2, 
                    borderColor: 'divider' 
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Chứng chỉ đã nhận
                    </Typography>
                    {certificates.length > 0 && (
                      <Chip 
                        label={certificates.length} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'primary.dark', 
                          color: 'primary.contrastText',
                          fontWeight: 600,
                          height: 24
                        }} 
                      />
                    )}
                  </Box>

                  {certificates.length === 0 ? (
                    <Box 
                      sx={{ 
                        textAlign: 'center', 
                        py: 6,
                        color: 'text.secondary'
                      }}
                    >
                      <WorkspacePremiumIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
                      <Typography variant="body1">
                        Chưa có chứng chỉ nào
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={2}>
                      {certificates.map((cert) => (
                        <Grid item xs={12} key={cert.id}>
                          <Card
                            elevation={0}
                            sx={{
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 2,
                              transition: 'all 0.2s',
                              '&:hover': {
                                boxShadow: 2,
                                borderColor: 'primary.contrastText',
                              }
                            }}
                          >
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor: 'primary.dark',
                                    color: 'primary.contrastText',
                                    flexShrink: 0
                                  }}
                                >
                                  <WorkspacePremiumIcon />
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      fontWeight: 600, 
                                      mb: 0.5,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {cert.name}
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    sx={{ mb: 1 }}
                                  >
                                    {cert.issuer} · {cert.course}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CalendarTodayIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {formatDate(cert.date)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
