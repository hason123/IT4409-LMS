import React from 'react';
import { Paper, Box, Typography, IconButton, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SchoolIcon from '@mui/icons-material/School';
import { styled } from '@mui/material/styles';

const CourseImageBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 160,
  borderRadius: '12px 12px 0 0',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%), linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
    opacity: 0.3,
  }
}));

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'đang học':
      return { color: '#1976d2', bgcolor: '#e3f2fd', label: 'Đang học' };
    case 'hoàn thành':
      return { color: '#2e7d32', bgcolor: '#e8f5e9', label: 'Hoàn thành' };
    case 'chưa bắt đầu':
      return { color: '#ed6c02', bgcolor: '#fff3e0', label: 'Sắp tới' };
    default:
      return { color: '#757575', bgcolor: '#f5f5f5', label: status || 'N/A' };
  }
};

const CourseCard = ({ course = {}, onClick, onSettingsClick }) => {
  const { image, title, className, code, start, end, instructor, status } = course;
  const statusStyle = status ? getStatusColor(status) : null;

  return (
    <Paper
      elevation={2}
      onClick={onClick}
      sx={{
        borderRadius: 3,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { 
          boxShadow: 8, 
          transform: 'translateY(-4px)',
          '& .course-image': {
            transform: 'scale(1.05)',
          }
        }
      }}
    >
      {/* Image/Icon Header */}
      <CourseImageBox className="course-image" sx={{ transition: 'transform 0.3s ease' }}>
        {image ? (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <SchoolIcon sx={{ fontSize: 64, color: 'white', opacity: 0.9, zIndex: 1 }} />
        )}
        
        {/* Status badge */}
        {status && (
          <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
            <Chip
              label={statusStyle.label}
              size="small"
              sx={{
                bgcolor: statusStyle.bgcolor,
                color: statusStyle.color,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            />
          </Box>
        )}

        {/* Settings button */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
          <IconButton
            size="small"
            onClick={(e) => { 
              e.stopPropagation(); 
              if (onSettingsClick) onSettingsClick(course); 
            }}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              color: 'rgba(0, 0, 0, 0.7)',
              '&:hover': {
                bgcolor: 'white',
                color: 'rgba(0, 0, 0, 0.9)',
              },
              width: 32,
              height: 32,
              '& .MuiSvgIcon-root': {
                color: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <SettingsOutlinedIcon fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.7)' }} />
          </IconButton>
        </Box>
      </CourseImageBox>

      {/* Content */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: 1.5,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 64
          }}
        >
          {title}
        </Typography>

        {/* Course Code and Class */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
          {code && (
            <Box sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 0.5,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: 'primary.dark',
              color: 'primary.contrastText'
            }}>
              <MenuBookIcon fontSize="small" sx={{ fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                {code}
              </Typography>
            </Box>
          )}
          
          {className && (
            <Box sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 0.5,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: 'grey.100',
              color: 'text.secondary'
            }}>
              <ClassIcon fontSize="small" sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.75rem', color: 'text.secondary' }}>
                {className}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Instructor */}
        {instructor && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PersonIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 18 }} />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {instructor}
            </Typography>
          </Box>
        )}

        {/* Date range */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mt: 'auto',
            pt: 2,
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <CalendarMonthIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 18 }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {start} — {end}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CourseCard;
