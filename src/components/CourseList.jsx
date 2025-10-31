import React from 'react';
import { List, ListItem, ListItemText, Divider, Chip, Box, Typography, Paper } from '@mui/material';

const CourseList = ({ title = 'Khóa học', courses = [] }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'đang học':
        return { color: 'primary', bgcolor: 'primary.light' };
      case 'hoàn thành':
        return { color: 'success', bgcolor: 'success.light' };
      case 'chưa bắt đầu':
        return { color: 'warning', bgcolor: 'warning.light' };
      default:
        return { color: 'default', bgcolor: 'grey.100' };
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
        {title}
      </Typography>
      
      <List disablePadding>
        {courses.length === 0 && (
          <ListItem>
            <ListItemText primary="Chưa tham gia khóa học nào" />
          </ListItem>
        )}
        {courses.map((c, idx) => {
          const statusStyle = getStatusColor(c.status);
          return (
            <React.Fragment key={c.id || idx}>
              <ListItem 
                sx={{ 
                  alignItems: 'center',
                  py: 1.5,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 600 }}>{c.title}</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">{c.code ? `${c.code} · ${c.instructor || ''}` : c.instructor}</Typography>}
                />
                {c.status && (
                  <Chip 
                    label={c.status}
                    size="small"
                    color={statusStyle.color}
                    sx={{
                      minWidth: 100,
                      bgcolor: statusStyle.bgcolor,
                      fontWeight: 500
                    }}
                  />
                )}
              </ListItem>
              {idx < courses.length - 1 && <Divider component="li" />}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default CourseList;
