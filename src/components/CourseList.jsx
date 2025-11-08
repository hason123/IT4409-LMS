import React from 'react';
import { List, ListItem, Divider, Chip, Box, Typography, Paper, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';

const CourseList = ({ title = 'Khóa học', courses = [], onCourseClick }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'đang học':
      case 'đang giảng dạy':
        return { color: '#1976d2', bgcolor: '#e3f2fd', label: 'Đang học' };
      case 'hoàn thành':
        return { color: '#2e7d32', bgcolor: '#e8f5e9', label: 'Hoàn thành' };
      case 'chưa bắt đầu':
        return { color: '#ed6c02', bgcolor: '#fff3e0', label: 'Chưa bắt đầu' };
      default:
        return { color: '#757575', bgcolor: '#f5f5f5', label: status || 'N/A' };
    }
  };

  return (
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, pb: 2, borderBottom: 2, borderColor: 'divider' }}>
        <MenuBookIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {courses.length > 0 && (
          <Chip 
            label={courses.length} 
            size="small" 
            sx={{ 
              bgcolor: 'primary.light', 
              color: 'primary.main',
              fontWeight: 600,
              height: 24
            }} 
          />
        )}
      </Box>
      
      {courses.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 6,
            color: 'text.secondary'
          }}
        >
          <MenuBookIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
          <Typography variant="body1">
            Chưa tham gia khóa học nào
          </Typography>
        </Box>
      ) : (
        <List disablePadding>
          {courses.map((c, idx) => {
            const statusStyle = getStatusColor(c.status);
            return (
              <React.Fragment key={c.id || idx}>
                <ListItem 
                  onClick={() => onCourseClick && onCourseClick(c)}
                  sx={{ 
                    alignItems: 'center',
                    py: 2,
                    px: 2,
                    borderRadius: 2,
                    mb: 1,
                    cursor: onCourseClick ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      transform: onCourseClick ? 'translateX(4px)' : 'none',
                    }
                  }}
                >
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
                      {c.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mt: 0.5 }}>
                      {c.code && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <MenuBookIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {c.code}
                          </Typography>
                        </Box>
                      )}
                      {c.instructor && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
                          <Typography variant="body2" color="text.secondary">
                            {c.instructor}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
                    {c.status && (
                      <Chip 
                        label={statusStyle.label}
                        size="small"
                        sx={{
                          minWidth: 110,
                          bgcolor: statusStyle.bgcolor,
                          color: statusStyle.color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          height: 28
                        }}
                      />
                    )}
                    {onCourseClick && (
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main',
                            bgcolor: 'primary.light'
                          }
                        }}
                      >
                        <ArrowForwardIosIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </ListItem>
                {idx < courses.length - 1 && (
                  <Divider 
                    variant="inset" 
                    component="li" 
                    sx={{ 
                      ml: 2,
                      mr: 2,
                      borderColor: 'divider'
                    }} 
                  />
                )}
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Paper>
  );
};

export default CourseList;
