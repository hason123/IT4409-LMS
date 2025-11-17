import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'student', // Default role is student
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login credentials:', credentials);
  };

  const handleHustLogin = () => {
    // Handle HUST login logic here
    console.log('HUST login clicked');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Đăng nhập
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên tài khoản"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 1 }}>Vai trò của bạn</FormLabel>
            <RadioGroup
              row
              name="role"
              value={credentials.role}
              onChange={handleChange}
              sx={{
                justifyContent: 'space-around',
                '& .MuiFormControlLabel-root': {
                  flex: 1,
                  margin: 0,
                }
              }}
            >
              <FormControlLabel 
                value="student" 
                control={<Radio />} 
                label="Sinh viên"
                sx={{
                  border: '1px solid',
                  borderColor: credentials.role === 'student' ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  py: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              />
              <FormControlLabel 
                value="teacher" 
                control={<Radio />} 
                label="Giảng viên"
                sx={{
                  border: '1px solid',
                  borderColor: credentials.role === 'teacher' ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  py: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 3,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none'
            }}
          >
            Đăng nhập
          </Button>
        </Box>

        <Divider sx={{ width: '100%', mb: 3 }}>hoặc</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<SchoolIcon />}
          onClick={handleHustLogin}
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Đăng nhập bằng tài khoản HUST
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;