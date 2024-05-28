import React, { useState } from 'react';
import hcmueLogo from '../images/hcmue.png';
import { TextField, Button, Typography, Container, Box, Link, InputAdornment, IconButton } from '@mui/material';

function LoginForm({ Login, error }) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const [details, setDetails] = useState({ taikhoan: "", password: "" });

  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #ccc', // Add border with a light gray color
          borderRadius: '10px', // Add rounded corners for a nicer look
          padding: '40px', // Add padding to improve visual appearance
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', // Add box shadow for a subtle elevation effect
        }}
      >
        <img src={hcmueLogo} alt="HCMUE Logo" style={{ width: '100px', marginBottom: '20px' }} />
        <Typography component="h1" variant="h5" align="center" >
          Hồ sơ xét tuyển đại học
        </Typography>
        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1}}>
          {error !== "" && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tài khoản"
            name="taikhoan"
            autoComplete="email"
            autoFocus
            onChange={e => setDetails({ ...details, taikhoan: e.target.value })}
            value={details.taikhoan}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type={passwordShown ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={e => setDetails({ ...details, password: e.target.value })}
            value={details.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
          <Box mt={2} textAlign="center">
            <Link href="https://hcmue.edu.vn" variant="body2">
              Bản quyền thuộc Trường Đại học Sư phạm Thành phố Hồ Chí Minh &#169;
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
