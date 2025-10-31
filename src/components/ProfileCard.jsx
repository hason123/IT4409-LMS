import React from 'react';
import { Avatar, Box, Typography, Grid, Divider, Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function calculateAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

const initialsFromName = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).slice(-2).join('').toUpperCase();
}

const ProfileCard = ({ profile = {} }) => {
  const { name, dob, email, phone, avatarUrl, bio } = profile;
  const age = calculateAge(dob);

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, width: '100%' }}>
      {/* Phần tiêu đề và nút chỉnh sửa */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        pb: 1,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6">Thông tin cá nhân</Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          size="small"
          sx={{ textTransform: 'none' }}
        >
          Chỉnh sửa
        </Button>
      </Box>

      {/* Phần trên: ảnh đại diện + tên + mã số sinh viên */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            src={avatarUrl}
            alt={name}
            sx={{ width: { xs: 80, md: 112 }, height: { xs: 80, md: 112 }, fontSize: { xs: 20, md: 32 }, bgcolor: 'primary.light', color: 'primary.contrastText' }}
          >
            {!avatarUrl && initialsFromName(name)}
          </Avatar>
        </Grid>

        <Grid item xs>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{name || 'Chưa có tên'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              MSSV: {profile.studentId || '---'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Phần chi tiết: mỗi thông tin một dòng riêng */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="body1">
          <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Email:</Box>
          {email || '---'}
        </Typography>
        
        <Typography variant="body1">
          <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Ngày sinh:</Box>
          {dob || '---'}
        </Typography>
        
        <Typography variant="body1">
          <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Tuổi:</Box>
          {age ?? '---'}
        </Typography>
        
        {phone && (
          <Typography variant="body1">
            <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Điện thoại:</Box>
            {phone}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ProfileCard;
