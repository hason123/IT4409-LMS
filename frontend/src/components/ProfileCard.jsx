import React from 'react';
import { Avatar, Box, Typography, Divider, Paper, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import { styled } from '@mui/material/styles';

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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  fontSize: 48,
  border: '4px solid',
  borderColor: theme.palette.primary.dark,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    width: 100,
    height: 100,
    fontSize: 40,
  },
}));

const InfoRow = ({ icon: Icon, label, value, isEditing, onChange, name, type = 'text' }) => (
  <Box sx={{ display: 'flex', alignItems: isEditing ? 'flex-start' : 'center', gap: 2, py: 1.5 }}>
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        bgcolor: 'transparent',
        color: 'primary.dark',
        border: '1px solid',
        flexShrink: 0,
        mt: isEditing ? 0.5 : 0
      }}
    >
      <Icon fontSize="small" />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
        {label}
      </Typography>
      {isEditing ? (
        <TextField
          fullWidth
          size="small"
          value={value || ''}
          onChange={(e) => onChange && onChange(name, e.target.value)}
          type={type}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            }
          }}
        />
      ) : (
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value || '---'}
        </Typography>
      )}
    </Box>
  </Box>
);

const ProfileCard = ({ profile = {}, isEditing = false, onEdit, onSave, onCancel, editedProfile = {}, onProfileChange }) => {
  const displayProfile = isEditing ? editedProfile : profile;
  const { name, dob, email, phone, avatarUrl } = displayProfile;
  const age = calculateAge(dob);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '---';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleChange = (field, value) => {
    if (onProfileChange) {
      onProfileChange({ ...editedProfile, [field]: value });
    }
  };

  // Format date for input type="date" (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        width: '100%',
        position: 'sticky',
        top: 24,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          boxShadow: 4,
        }
      }}
    >
      {/* Phần tiêu đề và nút chỉnh sửa */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        pb: 2,
        borderBottom: 2,
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Thông tin cá nhân</Typography>
        {!isEditing ? (
          <IconButton
            color="primary"
            size="small"
            onClick={onEdit}
            sx={{ 
              border: 1,
              borderColor: 'divider',
              color: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.dark',
                borderColor: 'primary.dark',
                color: 'primary.contrastText',
              }
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              onClick={onSave}
              sx={{ 
                border: 1,
                borderColor: 'divider',
                color: 'success.main',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'success.light',
                  borderColor: 'success.main',
                }
              }}
            >
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onCancel}
              sx={{ 
                border: 1,
                borderColor: 'divider',
                color: 'error.main',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'error.light',
                  borderColor: 'error.main',
                }
              }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Phần trên: ảnh đại diện + tên + mã số sinh viên */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <StyledAvatar
          src={avatarUrl}
          alt={name}
          sx={{ 
            bgcolor: 'primary.dark',
            color: 'primary.contrastText',
            mb: 2
          }}
        >
          {!avatarUrl && initialsFromName(name)}
        </StyledAvatar>
        {isEditing ? (
          <TextField
            fullWidth
            size="small"
            value={name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Tên"
            variant="outlined"
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        ) : (
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center' }}>
            {name || 'Chưa có tên'}
          </Typography>
        )}
        <Box sx={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 0.5,
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          color: 'black'
        }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {profile.studentId || '---'}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Phần chi tiết với icons */}
      <Box>
        <InfoRow 
          icon={EmailIcon}
          label="Email"
          value={email}
          isEditing={isEditing}
          onChange={handleChange}
          name="email"
          type="email"
        />
        <Divider variant="inset" sx={{ ml: 7 }} />
        
        <InfoRow 
          icon={CakeIcon}
          label="Ngày sinh"
          value={isEditing ? formatDateForInput(dob) : formatDate(dob)}
          isEditing={isEditing}
          onChange={handleChange}
          name="dob"
          type="date"
        />
        <Divider variant="inset" sx={{ ml: 7 }} />
        
        {!isEditing && (
          <>
            <InfoRow 
              icon={CakeIcon}
              label="Tuổi"
              value={age ? `${age} tuổi` : '---'}
            />
            <Divider variant="inset" sx={{ ml: 7 }} />
          </>
        )}
        
        <InfoRow 
          icon={PhoneIcon}
          label="Điện thoại"
          value={phone || ''}
          isEditing={isEditing}
          onChange={handleChange}
          name="phone"
          type="tel"
        />
      </Box>
    </Paper>
  );
};

export default ProfileCard;
