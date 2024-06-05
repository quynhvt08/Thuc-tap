import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import {Box, Link} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import apiCall from '../../../configAxios';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loadingAPI, setLoadingAPI] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const handleSubmit = async (values, { setErrors }) => {
    setLoadingAPI(true);
    try {
      const response = await apiCall.get('/users');
      if (response && response.data) {
        const user = response.data.find(user => user.email === values.email && user.password === values.password);
        if (user) {
          const token = user.token;
          localStorage.setItem('token', token);
          apiCall.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigate('../');
        } else {
          setErrors({ submit: 'Email hoặc mật khẩu không đúng' });
        }
      } else {
        setErrors({ submit: error.response ? error.response.data.message : 'Something went wrong' });
      }
    } catch (error) {
        console.log("error: ", error)
        setErrors({ submit: error.response ? error.response.data.message : 'Something went wrong' });
    }
    setLoadingAPI(false);
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Email không hợp lệ').max(255).required('Vui lòng nhập Email'),
          password: Yup.string().max(255).required('Vui lòng nhập password')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Địa chỉ Email</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ email của bạn"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
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
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Nhập mật khẩu của bạn"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button fullWidth size="large" type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                  {loadingAPI && <CircularProgress size={20}  sx={{ color:'white', ml: -2, mr: 1}}/>}
                    Đăng nhập
                  </Button>
                </AnimateButton>
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
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
