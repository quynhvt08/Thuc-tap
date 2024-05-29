import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AnimateButton from 'components/@extended/AnimateButton';
import { Typography } from '@mui/material';

const AuthLogin = ({ isDemo = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, setSubmitting) => {
    setError('');
    setSuccess('');

    try {
      const response = await axios.get('http://localhost:3008/users', {
        params: {
          email: values.email,
          password: values.password
        }
      });
      const user = response.data.find(user => user.email === values.email && user.password === values.password);
      if (user) {
        localStorage.setItem('token', user.token);
        setSuccess(`Đăng nhập thành công. Welcome ${user.name}!`);
        navigate('/');
      } else {
        setError('Email hoặc password không hợp lệ');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Phải là email hợp lệ').max(255).required('Email là bắt buộc'),
        password: Yup.string().max(255).required('Mật khẩu là bắt buộc'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleLogin(values, setSubmitting);
      }}
    >
      {({ errors, handleBlur, handleChange, touched, values, isSubmitting, handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login"></InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  sx={{ height: '50px', fontSize: '0.9rem' }}
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0}>
                <InputLabel htmlFor="password-login"></InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Nhập mật khẩu"
                  sx={{ height: '50px', fontSize: '0.9rem' }}
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box mt={0}>
                {error && (
                  <Typography variant="body1" color="error" style={{ fontSize: '1em' }}>
                    {error}
                  </Typography>
                )}
                {success && (
                  <Typography variant="body1" color="primary" style={{ fontSize: '1em' }}>
                    {success}
                  </Typography>
                )}
              </Box>
              <Box mt={2}>
                <AnimateButton>
                  <Button fullWidth size="large" type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Đăng nhập
                  </Button>
                </AnimateButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2} textAlign="center">
                <Link href="https://hcmue.edu.vn" variant="body2">
                    Bản quyền thuộc Trường Đại học Sư phạm Thành phố Hồ Chí Minh &#169;
                </Link>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
